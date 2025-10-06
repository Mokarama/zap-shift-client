import React from "react";

const features = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: "/src/assets/live-tracking.png",
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: "/src/assets/safe-delivery.png",
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: "/src/assets/agent-pending.png",
  },
];

const FeatureCards = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      {features.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-base-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          {/* Image + Dotted line */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <img src={item.image} alt={item.title} className="w-full h-auto" />
            </div>

            {/* Dotted vertical line (only on large screens) */}
            <div className="hidden md:block h-20 border-r-2 border-dotted border-gray-400"></div>
          </div>

          {/* Text content */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
