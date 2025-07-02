const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/userControllers");
//
// User routes
router.post("/login", authUser); //  Route for User Login
router.post("/google-auth", googleAuth); // Route for Google authentication

router.post("/signup/lawyer", signupLawyer); // Route for Lawyer Signup
router.get("/lawyers/getprofile/:userId", getLawyerProfile); // Route for getting lawyer profile
router.put("/lawyers/updateprofile/:userId", updateLawyerProfile); // Route for updating lawyer profile

router.post("/signup/lawfirm", signupLawFirm); // Route for lawfirm Signup
router.get("/lawfirms/getprofile/:userId", getLawFirmProfile); // Route for getting lawfirm profile
router.put("/lawfirms/updateprofile/:userId", updateLawFirmProfile); // Route for updating lawfirm profile

router.post("/signup/paralegal", signupParalegal); // Route for paralegal Signup
router.get("/paralegals/getprofile/:userId", getParalegalProfile); // Route for getting paralegal profile
router.put("/paralegals/updateprofile/:userId", updateParalegalProfile); // Route for updating paralegal profile

router.post("/signup/mediator", signupMediator); // Route for mediator Signup
router.get("/mediators/getprofile/:userId", getMediatorProfile); // Route for getting mediator profile
router.put("/mediators/updateprofile/:userId", updateMediatorProfile); // Route for updating mediator profile

router.post("/signup/client", signupClient); // Route for client Signup
router.get("/clients/getprofile/:userId", getClientProfile); // Route for getting client profile
router.put("/clients/updateprofile/:userId", updateClientProfile); // Route for updating client profile

router.post("/signup/corporate", signupCorporate); // Route for corporate Signup
router.get("/corporates/getprofile/:userId", getCorporateProfile); // Route for getting corporate profile
router.put("/corporates/updateprofile/:userId", updateCorporateProfile); // Route for updating corporate profile

module.exports = router;
