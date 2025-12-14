import avatar1 from "../img/avatars/avatar1.png";
import avatar2 from "../img/avatars/avatar2.png";
import avatar3 from "../img/avatars/avatar3.png";
import avatar4 from "../img/avatars/avatar4.png";
import avatar5 from "../img/avatars/avatar5.png";
import avatar6 from "../img/avatars/avatar6.png";
import avatar7 from "../img/avatars/avatar7.png";
import avatar8 from "../img/avatars/avatar8.png";


const avatares = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

export function getAvatarLocal(seed) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 8) - hash);
  }

  const index = Math.abs(hash) % avatares.length;
  return avatares[index];
}
