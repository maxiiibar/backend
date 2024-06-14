import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// router.get("/profile", (req, res) => {
//     console.log(req.session)
//   res.render("profile");
// });

router.get('/realTimeProducts', async(req, res) => {
    res.render('realTimeProducts')
})


export default router;