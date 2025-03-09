import { getProfile } from "@/services/user/get-profile";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Profile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => getProfile(),
  });

  console.log(data);

  return (
    <div>
      {/* {!isLoading && (
          <Image 
         src={data.perfilPhoto}
           alt="foto de perfil"
          width={400}
           height={400}
         />
       )} */}
    </div>
  );
};

export default Profile;
