import React from "react";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  content: string;
  image?: string;  // Optional since not all cards might have an image
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, image }) => (
  <div className="p-6 shadow-lg rounded-lg bg-white text-center space-y-4">
    {image && (
      <Image
        src={image}
        alt={title}
        width={150}
        height={75}
        className="mx-auto"
      />
    )}
    <h4 className="text-xl font-semibold">{title}</h4>
    <p className="text-gray-600 text-sm">{content}</p>
  </div>
);

export default InfoCard;