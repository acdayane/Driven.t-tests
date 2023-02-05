import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const hotelsList = await hotelsService.getHotelsService(userId);
    return res.status(httpStatus.OK).send(hotelsList);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }   
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const userId = req.userId;

  try {
    const roomsList = await hotelsService.getRoomsService(userId, Number(hotelId));
    return res.status(httpStatus.OK).send(roomsList);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
