import { prisma } from "@/config";

async function findTicket(userId: number) {
  const ticket = prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      }
    },
    include: {
      Enrollment: true,
      TicketType: true
    },
  });
  return ticket;
}

async function findHotels() {
  const hotels = prisma.hotel.findMany();
  return hotels;
}

async function findRooms(hotelId: number) {
  const rooms = prisma.hotel.findUnique({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
  return rooms;
}

const hotelsRepository = {
  findTicket,
  findHotels,
  findRooms
};

export default hotelsRepository;