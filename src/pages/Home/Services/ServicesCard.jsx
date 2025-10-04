

const ServicesCard = ({servicesData }) => {
   const {icon:Icon, title,description} =servicesData;  
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center">
      <div className="text-4xl text-primary mb-4">
        <Icon/>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServicesCard;
