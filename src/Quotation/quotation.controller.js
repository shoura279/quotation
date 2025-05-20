import { Router } from "express";
import { isAuthenticated, isAuthorized } from "../Middleware/authorization.js";
import { asyncHandler } from "../Utils/Error/async-handler.js";
import * as quotationService from "./quotation.service.js";
const router = Router();

// add quotations
/**
 * @method POST
 * @url /quotation
 */
router.post("/", isAuthorized, asyncHandler(quotationService.addQuotation));

// update quotation
/**
 * @method PUT
 * @url /quotation/:id
 */
router.put(
  "/:id",
  isAuthorized,
  asyncHandler(quotationService.updateQuotation)
);

// delete quotation
/**
 * @method DELETE
 * @url /quotation/:id
 */
router.delete(
  "/:id",
  isAuthorized,
  asyncHandler(quotationService.deleteQuotation)
);
// get quotation
/**
 * @method GET
 * @url /quotation/:id
 */
router.get("/:id", isAuthorized, asyncHandler(quotationService.getQuotation));
// get all quotations
/**
 * @method GET
 * @url /quotation
 */
router.get("/", isAuthorized, asyncHandler(quotationService.getAllQuotations));
export default router;
