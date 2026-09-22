/**
 * Node Modules
 */
import Image from "next/image";

const Profile = () => {
  return (
    <div className="group relative">
      <span className="border-accent absolute -top-1.5 -right-1.5 size-3 border-t-2 border-r-2 md:size-4" />
      <span className="border-accent absolute -bottom-1.5 -left-1.5 size-3 border-b-2 border-l-2 md:size-4" />
      <div className="border-border bg-sunken relative size-16 shrink-0 overflow-hidden rounded-md border md:size-36 lg:size-40">
        <Image
          src="/images/profile-headshot.jpeg"
          alt="Irly Fizaharis — profile headshot"
          fill
          priority
          sizes="(min-width: 1024px) 160px, (min-width: 768px) 144px, 64px"
          className="bg-sunken object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Profile;
