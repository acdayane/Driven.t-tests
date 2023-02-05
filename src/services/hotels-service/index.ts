import { notFoundError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function getHotelsService(userId: number) {
  const verifyTicket = await hotelsRepository.findTicket(userId);

  if (!verifyTicket) throw notFoundError();

  const isPaid = verifyTicket.status;
  const isRemote = verifyTicket.TicketType.isRemote;
  const includesHotel = verifyTicket.TicketType.includesHotel;

  if (isPaid !== "PAID" || isRemote === true || includesHotel === false) {
    throw unauthorizedError();
  }

  const hotelsList = await hotelsRepository.findHotels();

  return hotelsList;
}

async function getRoomsService(userId: number, hotelId: number) {
  const verifyTicket = await hotelsRepository.findTicket(userId);

  if (!verifyTicket) throw notFoundError();

  const isPaid = verifyTicket.status;
  const isRemote = verifyTicket.TicketType.isRemote;
  const includesHotel = verifyTicket.TicketType.includesHotel;

  if (isPaid !== "PAID" || isRemote === true || includesHotel === false) {
    throw unauthorizedError();
  }

  const roomsList = await hotelsRepository.findRooms(hotelId);

  return roomsList;
}

const hotelsService = {
  getHotelsService,
  getRoomsService,
};
  
export default hotelsService;