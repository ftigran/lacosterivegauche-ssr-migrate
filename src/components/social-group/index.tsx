import React from 'react';
import { Box, Link } from '@material-ui/core';
import { ReactComponent as VkImg } from '../../imgs/tikkurila/soc/Shape_vk.svg';
import { ReactComponent as FbImg } from '../../imgs/tikkurila/soc/Shape_fb.svg';
import { ReactComponent as InImg } from '../../imgs/tikkurila/soc/Shape_ig.svg';
import { ReactComponent as YtImg } from '../../imgs/tikkurila/soc/Shape_yt.svg';

type Props = {};

const SocialGroup: React.FC<Props> = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      alignContent="center"
      justifyContent="center"
    >
      <Box flex="0 0 auto" m={1}>
        <Link href="http://vk.com/tikkurilaru" target="_blank">
          <VkImg />
        </Link>
      </Box>
      <Box flex="0 0 auto" m={1}>
        <Link href="https://www.facebook.com/tikkurilaru" target="_blank">
          <FbImg />
        </Link>
      </Box>
      <Box flex="0 0 auto" m={1}>
        <Link href="https://www.instagram.com/tikkurila_ru/" target="_blank">
          <InImg />
        </Link>
      </Box>
      <Box flex="0 0 auto" m={1}>
        <Link href="http://www.youtube.com/user/TikkurilaRU" target="_blank">
          <YtImg />
        </Link>
      </Box>
    </Box>
  );
};

export default SocialGroup;
