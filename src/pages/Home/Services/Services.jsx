

import { FaShippingFast, FaGlobe, FaBoxOpen, FaMoneyCheckAlt, FaBuilding, FaUndoAlt } from "react-icons/fa";
import ServicesCard from "./ServicesCard";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: FaShippingFast
  },
  {
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: FaGlobe
  },
  {
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: FaBoxOpen
  },
  {
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: FaMoneyCheckAlt
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support.",
    icon: FaBuilding
  },
  {
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: FaUndoAlt
  }
];

const Services = () => {
  return (
    <section className="py-20 my-5 bg-[#024b53]  rounded-2xl">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl text-white font-bold text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-300 mb-12">
          We offer a variety of delivery and logistics solutions tailored to your needs.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServicesCard
              key={index}
              icon={service.icon}
              service={service}
              servicesData={service}
              
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
