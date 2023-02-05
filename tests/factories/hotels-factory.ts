import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: "H Hotel Niterói",
      image: "https://redbluehotels.com.br/images/hniteroi6.jpg",
      Rooms: {
        create: {
          name: "Double",
          capacity: 2
        },
      },
    },
    include: {
      Rooms: true,
    },
  });
}