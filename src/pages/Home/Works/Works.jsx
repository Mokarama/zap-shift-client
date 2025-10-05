import { FaTruckPickup } from "react-icons/fa";

const  Works =()=> {
  const cards = [
    {
      icon: <FaTruckPickup size={50} className="text-gray-600 hover:text-blue-500" />,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      icon: <FaTruckPickup size={50} className="text-gray-600 hover:text-blue-500" />,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      icon: <FaTruckPickup size={50} className="text-gray-600 hover:text-blue-500" />,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      icon: <FaTruckPickup size={50} className="text-gray-600 hover:text-blue-500" />,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time."
    },
  ];

  return (
    <div className="bg-gray-200 py-20 px-6 rounded-xl">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-10">
        How it Works
      </h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white  shadow-md rounded-2xl px-5 py-12 text-center hover:shadow-xl transition"
          >
            <div className="mb-4 flex justify-center">{card.icon}</div>
            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Works;