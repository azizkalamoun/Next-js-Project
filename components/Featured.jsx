import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured3.png",
  ];

  const handleArrow = (direction) =>{
      if(direction==="l"){
          setIndex(index !== 0 ? index-1 : 2)
      }
      if(direction==="r"){
          setIndex(index !== 2 ? index+1 : 0)
      }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow("l")}>
        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABY0lEQVR4nO3dQUoDQRQA0blK9noCBdFLuNBtTujFJMaVgZIggoYsnI1dmal3gk+Knk6gMz1NSZIkSZIkSZJcFGADbIGr0bOsHnAHvPHlA3hc/YcyOMae34oyKMbtj5Vx6gA8DxlsjTi/MjizUq5Hz7p4/C3Gt+3oeReNeTGOj7PN6JnXumecegfuR8+8WBTDg2J4UAwPiuFBMTwohgfF8KAYHhTDg2J4UAwPiuFBMTwohgfF8KAYHhTDoxgixRAphkgxRIohUgyRYogUQwS4mXG8c388Djp65sU6ni4HXoshAbwUQ6QgMj2yhNrUvV97dzP+u/EweubFK4pQUYSKIlQUoaIIFUWoKEL0O8WHovhQFB+K4kNRfCiKD0XxoSg+FMWHovhQFB+K4kNRfCiKD0XxoSg+FMWHovjQq8Z96GX8PnRdxcXtKQfgafSMq0NXHvnQpWA+dG1ekiRJkiRJkmT6D58NJyDodnsumwAAAABJRU5ErkJggg==" alt="" layout="fill" objectFit="contain"/>
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow("r")}>
        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnUlEQVR4nO3bwSpEYRiH8VFIoRTlVhQK5Q64K1ZyCZRSwz2M+7BUVsjGpEcyZUE6ZzPv3zfPb3lWbz3n/c4svhkMJEmSJEmSJEmSvgCHwA1wAqxMHqsCcAS88e0OWLVGTYxjYMxPI6PUbMb4lxhGKYixBDz9EcMoUw6yBrx3COLxNcUopx2DGGVKQeaAsx5R/PVllBmEm5IHo+TBKHkwSh6Mkgej5MEoeTBKHoySB6PkwSh5MEoejJIHo+TBKHkwSh6Mkgej5MEoeTBKHoySB6PkwSixUc69Ifm/N2UELFfP3TT6b8pV9cyzEuW6R5SN6pmbBuwCLx1j3APz1TM3i34xnoGt6pmbRb8Yr8Be9czNArYnb3zXGAfVMzcLY+TAGDkwRg6MkQNj5MAYOTBGDoyRA2PkwBg5MEYOjJEDY+TAGDkwRg6MkQNj5MAYOTBGDoyRA2PkwBg5MEYOjJED2Ol5o3C/euZmAQvAgzFCAOvGCANceEzlHVtDLz4HARaBWz/geVEuJ1Ee/X9GCGDzM071HJIkSZIkSZI0qPYBrFuDfMGD35IAAAAASUVORK5CYII=" layout="fill" alt="" objectFit="contain"/>
      </div>
    </div>
  );
};

export default Featured;
