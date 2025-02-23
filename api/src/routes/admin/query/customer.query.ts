import { Router } from "express";
import { validateBody } from "../../../utils/validateBody.utils";
import { schemas } from "../../../schemas/index.schema";
import { controllers } from "../../../controllers";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});
const uploadFile = multer({ storage: storage });

export default (router: Router) => {
  router.post(
    "/add-customer",
    validateBody(schemas.customerAddSchema),
    controllers.admin.addCustomer
  );
  router.get("/get-all-customers", controllers.admin.getAllCustomers);
  router.post(
    "/upload-customers",
    uploadFile.single("uploadFile"),
    controllers.admin.uploadCustomer
  );
  router.post("/get-customer-details", controllers.customer.getById);
};
