const {
  User,
  Student,
  Lawyer,
  LawFirm,
  Paralegal,
  Mediator,
  Client,
  Corporate,
} = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @description     Auth the user
// @route           POST /api/users/login
// @access          Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the fields",
    });
  }

  const userExists = await User.findOne({ email }).exec();

  if (userExists && (await verifyPassword(password, userExists.password))) {
    return res.status(200).json({
      success: true,
      _id: userExists._id,
      email: userExists.email,
      userType: userExists.userType,
      token: generateToken(userExists._id, userExists.email),
      message: "Authenticated Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
};

const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email } = payload;

    // Check if the user exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Send a response with the user info and a token
    res.json({
      success: true,
      _id: user._id,
      email: user.email,
      userType: user.userType,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Google Authentication Failed",
    });
  }
};

// ------------------------------------ Lawyer ------------------------------------

// @description     Signup Lawyer
// @route           POST /api/users/signup/lawyer
// @access          Public

const signupLawyer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      phone,
      address,
      barCouncilId,
      languagesSpoken,
    } = req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: "Lawyer",
    });
    await user.save();

    const lawyer = new Lawyer({
      lawyer_Userid: user._id,
      name,
      specialization,
      experience,
      phone,
      address,
      barCouncilId,
      languagesSpoken,
    });
    await lawyer.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Lawyer registered successfully",
        data: lawyer,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error during signup",
        error: error.message,
      });
  }
};

// @description   Get lawyer's profile
// @route         GET /api/lawyers/profile/:userId
// @access        Private (Lawyer only)
const getLawyerProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const lawyer = await Lawyer.findOne({ lawyer_Userid: userId });
    if (lawyer) {
      return res.status(200).json({ success: true, data: lawyer });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Lawyer not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @description     Update lawyer's profile
// @route           PUT /api/lawyers/profile/:userId
// @access          Private (Lawyer only)
const updateLawyerProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { lawyer_Userid: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLawyer) {
      return res
        .status(404)
        .json({ success: false, message: "Lawyer not found" });
    }

    return res.status(200).json({ success: true, data: updatedLawyer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------------------------ LawFirm ------------------------------------

// @description     Signup Law Firm
// @route           POST /api/users/signup/lawfirm
// @access          Public
const signupLawFirm = async (req, res) => {
  try {
    const {
      firmName,
      email,
      password,
      registrationNumber,
      address,
      phone,
      servicesOffered,
    } = req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: "LawFirm",
    });
    await user.save();

    const lawFirm = new LawFirm({
      lawfirm_Userid: user._id,
      firmName,
      registrationNumber,
      address,
      phone,
      email,
      servicesOffered,
    });
    await lawFirm.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Law Firm registered successfully",
        data: lawFirm,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error during signup",
        error: error.message,
      });
  }
};

// @description     Get law firm's profile
// @route           GET /api/lawfirms/profile/:userId
// @access          Private (LawFirm only)
const getLawFirmProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const lawFirm = await LawFirm.findOne({ lawfirm_Userid: userId });
    if (lawFirm) {
      return res.status(200).json({ success: true, data: lawFirm });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Law firm not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @description     Update law firm's profile
// @route           PUT /api/lawfirms/profile/:userId
// @access          Private (LawFirm only)
const updateLawFirmProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedLawFirm = await LawFirm.findOneAndUpdate(
      { lawfirm_Userid: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLawFirm) {
      return res
        .status(404)
        .json({ success: false, message: "Law firm not found" });
    }

    return res.status(200).json({ success: true, data: updatedLawFirm });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------------------------ Paralegal ------------------------------------

// @description     Signup Paralegal
// @route           POST /api/users/signup/paralegal
// @access          Public
const signupParalegal = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      qualifications,
      experience,
      phone,
      address,
      skills,
    } = req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: "Paralegal",
    });
    await user.save();

    const paralegal = new Paralegal({
      paralegal_Userid: user._id,
      name,
      qualifications,
      experience,
      phone,
      address,
      skills,
    });
    await paralegal.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Paralegal registered successfully",
        data: paralegal,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error during signup",
        error: error.message,
      });
  }
};

// @description     Get paralegal's profile
// @route           GET /api/paralegals/profile/:userId
// @access          Private (Paralegal only)
const getParalegalProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const paralegal = await Paralegal.findOne({ paralegal_Userid: userId });
    if (paralegal) {
      return res.status(200).json({ success: true, data: paralegal });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Paralegal not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @description     Update paralegal's profile
// @route           PUT /api/paralegals/profile/:userId
// @access          Private (Paralegal only)
const updateParalegalProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedParalegal = await Paralegal.findOneAndUpdate(
      { paralegal_Userid: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedParalegal) {
      return res
        .status(404)
        .json({ success: false, message: "Paralegal not found" });
    }

    return res.status(200).json({ success: true, data: updatedParalegal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------------------------ Mediator ------------------------------------

// @description     Signup Mediator
// @route           POST /api/users/signup/mediator
// @access          Public
const signupMediator = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      certificationId,
      experience,
      phone,
      address,
      languagesSpoken,
    } = req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: "Mediator",
    });
    await user.save();

    const mediator = new Mediator({
      mediator_Userid: user._id,
      name,
      certificationId,
      experience,
      phone,
      address,
      languagesSpoken,
    });
    await mediator.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Mediator registered successfully",
        data: mediator,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error during signup",
        error: error.message,
      });
  }
};

// @description     Get mediator's profile
// @route           GET /api/mediators/profile/:userId
// @access          Private (Mediator only)
const getMediatorProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const mediator = await Mediator.findOne({ mediator_Userid: userId });
    if (mediator) {
      return res.status(200).json({ success: true, data: mediator });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Mediator not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @description     Update mediator's profile
// @route           PUT /api/mediators/profile/:userId
// @access          Private (Mediator only)
const updateMediatorProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedMediator = await Mediator.findOneAndUpdate(
      { mediator_Userid: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMediator) {
      return res
        .status(404)
        .json({ success: false, message: "Mediator not found" });
    }

    return res.status(200).json({ success: true, data: updatedMediator });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------------------------ Client ------------------------------------

// @description     Signup Client
// @route           POST /api/users/signup/client
// @access          Public
const signupClient = async (req, res) => {
  try {
    const { name, email, password, age, gender, phone, address, legalNeeds } =
      req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: "Client",
    });
    await user.save();

    const client = new Client({
      client_Userid: user._id,
      name,
      age,
      gender,
      phone,
      address,
      legalNeeds,
    });
    await client.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Client registered successfully",
        data: client,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error during signup",
        error: error.message,
      });
  }
};

// @description     Get client's profile
// @route           GET /api/clients/profile/:userId
// @access          Private (Client only)
const getClientProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const client = await Client.findOne({ client_Userid: userId });
    if (client) {
      return res.status(200).json({ success: true, data: client });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @description     Update client's profile
// @route           PUT /api/clients/profile/:userId
// @access          Private (Client only)
const updateClientProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedClient = await Client.findOneAndUpdate(
      { client_Userid: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    return res.status(200).json({ success: true, data: updatedClient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------------------------ Corporate ------------------------------------

// @description     Signup Corporate
// @route           POST /api/users/signup/corporate
// @access          Public
const signupCorporate = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      industry,
      registrationNumber,
      address,
      contactPerson,
      phone,
    } = req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: "Corporate",
    });
    await user.save();

    const corporate = new Corporate({
      corporate_Userid: user._id,
      companyName,
      industry,
      registrationNumber,
      address,
      contactPerson,
      phone,
      email,
    });
    await corporate.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Corporate entity registered successfully",
        data: corporate,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error during signup",
        error: error.message,
      });
  }
};

// @description     Get corporate profile
// @route           GET /api/corporates/profile/:userId
// @access          Private (Corporate only)
const getCorporateProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const corporate = await Corporate.findOne({ corporate_Userid: userId });
    if (corporate) {
      return res.status(200).json({ success: true, data: corporate });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Corporate not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @description     Update corporate profile
// @route           PUT /api/corporates/profile/:userId
// @access          Private (Corporate only)
const updateCorporateProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedCorporate = await Corporate.findOneAndUpdate(
      { corporate_Userid: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCorporate) {
      return res
        .status(404)
        .json({ success: false, message: "Corporate not found" });
    }

    return res.status(200).json({ success: true, data: updatedCorporate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  authUser,
  googleAuth,
  signupLawyer,
  getLawyerProfile,
  updateLawyerProfile,
  signupLawFirm,
  getLawFirmProfile,
  updateLawFirmProfile,
  signupParalegal,
  getParalegalProfile,
  updateParalegalProfile,
  signupMediator,
  getMediatorProfile,
  updateMediatorProfile,
  signupClient,
  getClientProfile,
  updateClientProfile,
  signupCorporate,
  getCorporateProfile,
  updateCorporateProfile,
};
