import { Router } from "express";
import auth from "../middleware/auth";
import { addContent, createShareableLink, deleteContent,  deleteShareableLink,  getAllContent,  getUserBrain,  updateContent } from "../controllers/content";

const router = Router()

router.route("/").post(auth,addContent)
router.route("/").get(auth, getAllContent)
router.route("/:contentId").put(auth, updateContent)
router.route("/:contentId").delete(auth, deleteContent)


router.route("/share").post(auth, createShareableLink)
router.route("/shared/:linkHash").get( getUserBrain)
router.route("/share").delete(auth, deleteShareableLink)






export default router


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTAzYmEwMjYxNTFmYTYzNTdlZjk2MyIsIm5hbWUiOiJBbmlydWRoIiwiZW1haWwiOiJhbmlAZ21haWwuY29tIiwiaWF0IjoxNzM0OTM4MjY0LCJleHAiOjE3MzUwMjQ2NjR9.xonvcamNrREC4r7pvHNRpUWsALlsXBElDMF2RwzQHUs