import { Router } from "express";
import { isAuthorized, isAuthenticate } from "../Middleware/authorization.js";
import { asyncHandler } from "../Utils/Error/async-handler.js";
import * as quotationService from "./quotation.service.js";
const router = Router();

// add quotations
/**
 * @method POST
 * @url /quotation
 */
router.post("/", isAuthenticate, asyncHandler(quotationService.addQuotation));

// update quotation
/**
 * @method PUT
 * @url /quotation/:id
 */
router.put(
  "/:id",
  isAuthenticate,
  asyncHandler(quotationService.updateQuotation)
);

// delete quotation
/**
 * @method DELETE
 * @url /quotation/:id
 */
router.delete(
  "/:id",
  isAuthenticate,
  asyncHandler(quotationService.deleteQuotation)
);
// get quotation
/**
 * @method GET
 * @url /quotation/:id
 */
router.get("/:id", isAuthenticate, asyncHandler(quotationService.getQuotation));
// get all quotations
/**
 * @method GET
 * @url /quotation
 */
router.get("/", isAuthenticate, asyncHandler(quotationService.getAllQuotations));
export default router;
