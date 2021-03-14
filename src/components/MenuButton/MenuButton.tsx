import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

import { Icon } from "@material-ui/core";
import ButtonBase from '@material-ui/core/ButtonBase';

import { Container, Slide } from '../../styles/components/MenuButton';

export default function ManuButton({ layout, path, name, icon }) {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    router.pathname === layout + path ? setActive(true) : setActive(false)
  }, [router.pathname])

  return (
    <Link href={layout + path}>
      <ButtonBase>
        <Container isActive={active}>
          <Icon className="Icon">{icon}</Icon>
          <h2>{name}</h2>
          { active ?
            <Slide 
              initial={{
                scaleX: 0,
                x: 100
              }}
              animate={{
                scaleX: 1,
                x: 0
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30
              }}
            /> :
            null
          }
        </Container>
      </ButtonBase>
    </Link>
  );
}