import React, { useMemo } from 'react';
import {
  VKShareButton,
  OKShareButton,
  FacebookShareButton,
  InstapaperShareButton,
} from 'react-share';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import { ReactComponent as OkImg } from '../../imgs/social-share-ok.svg';
import { ReactComponent as VkImg } from '../../imgs/tikkurila/soc/Shape_vk.svg';
import { ReactComponent as FbImg } from '../../imgs/tikkurila/soc/Shape_fb.svg';

const useStyles = makeStyles((theme) => ({
  shareButton: {
    outline: '0 none',
  },
}));

const getMetaContent = (function () {
  const metas: { [key: string]: string } = {};
  const metaGetter = function (metaName: string) {
    Array.prototype.some.call(document.getElementsByTagName('meta'), function (el) {
      if (el.name === metaName) {
        Object.assign(metas, { [metaName]: el.content });
        return true;
      }
      if (el.getAttribute('property') === metaName) {
        Object.assign(metas, { [metaName]: el.content });
        return true;
      } else {
        Object.assign(metas, { [metaName]: 'meta tag not found' });
      }
    });
    return metas[metaName];
  };
  return metaGetter;
})();

interface Props {
  shareUrl?: string;
  shareTitle?: string;
  shareDescription?: string;
  shareImage?: string;
  onClick?(provider: string): void;
}
// const url = getMetaContent("og:url");
// const title = getMetaContent("og:title");
// const description = getMetaContent("og:description");
// const image = getMetaContent("og:image");

//   const {
//     shareUrl = url,
//     shareTitle = title,
//     shareDescription = description,
//     shareImage = image,
//   } = props || {};

const SocialShare = (p: Props) => {
  const { onClick = (provider: string) => {} } = p;
  const shareUrl = useMemo(() => getMetaContent('og:url'), []);
  const shareTitle = useMemo(() => getMetaContent('og:title'), []);
  const shareDescription = useMemo(() => getMetaContent('og:description'), []);
  const shareImage = useMemo(() => getMetaContent('og:image'), []);
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      alignContent="center"
      justifyContent="center"
    >
      <Box flex="0 0 auto" m={1}>
        <VKShareButton
          className={classes.shareButton}
          onClick={() => {
            onClick('vkontakte');
          }}
          url={shareUrl}
          title={shareDescription}
          image={shareImage}
        >
          <VkImg />
        </VKShareButton>
      </Box>
      <Box flex="0 0 auto" m={1}>
        <FacebookShareButton
          className={classes.shareButton}
          onClick={() => {
            onClick('facebook');
          }}
          url={shareUrl}
        >
          <FbImg />
        </FacebookShareButton>
      </Box>
      {/*<Box flex="0 0 auto" m={1}>*/}
      {/*  <OKShareButton*/}
      {/*    className={classes.shareButton}*/}
      {/*    onClick={() => {*/}
      {/*      onClick('odnoklassniki');*/}
      {/*    }}*/}
      {/*    url={shareUrl}*/}
      {/*    title={shareTitle}*/}
      {/*    image={shareImage}*/}
      {/*    description={shareDescription}*/}
      {/*  >*/}
      {/*    <OkImg />*/}
      {/*  </OKShareButton>*/}
      {/*</Box>*/}
    </Box>
  );
};

export default SocialShare;
