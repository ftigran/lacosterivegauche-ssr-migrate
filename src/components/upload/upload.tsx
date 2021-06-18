import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { Box, makeStyles, Fade } from '@material-ui/core';
import EXIF from 'exif-js';
import RootRef from '@material-ui/core/RootRef';
import { useDropzone } from 'react-dropzone';
//
export interface onUploadProps {
  type: string | null;
  ext: string | null;
  url: string | null;
}
interface Props {
  showDropArea?: boolean;
  onUpload?(props: onUploadProps): void;
  onProcessed?(processed: boolean): void;
  title?: ReactNode | string | undefined;
  processed?: boolean;
}

const useStyles = makeStyles((theme) => ({
  dropArea: {
    position: 'relative',
    borderColor: '#fff',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: theme.spacing(0),
    cursor: 'pointer',
    '&:focus': {
      outline: '0 none',
    },
  },
}));

function setOrientation(img: any): HTMLCanvasElement | null {
  const orientation = EXIF.getTag(img, 'Orientation');
  const canvas = document.createElement('canvas');

  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx?.save();
  const width = canvas.width;
  const styleWidth = canvas.style.width;
  const height = canvas.height;
  const styleHeight = canvas.style.height;
  if (orientation) {
    if (orientation > 4) {
      canvas.width = height;
      canvas.style.width = styleHeight;
      canvas.height = width;
      canvas.style.height = styleWidth;
    }
    switch (orientation) {
      case 2:
        ctx?.translate(width, 0);
        ctx?.scale(-1, 1);
        break;
      case 3:
        ctx?.translate(width, height);
        ctx?.rotate(Math.PI);
        break;
      case 4:
        ctx?.translate(0, height);
        ctx?.scale(1, -1);
        break;
      case 5:
        ctx?.rotate(0.5 * Math.PI);
        ctx?.scale(1, -1);
        break;
      case 6:
        ctx?.rotate(0.5 * Math.PI);
        ctx?.translate(0, -height);
        break;
      case 7:
        ctx?.rotate(0.5 * Math.PI);
        ctx?.translate(width, -height);
        ctx?.scale(-1, 1);
        break;
      case 8:
        ctx?.rotate(-0.5 * Math.PI);
        ctx?.translate(-width, 0);
        break;
    }
  }
  ctx?.drawImage(img, 0, 0);
  ctx?.restore();
  return canvas;
}

export default (props: Props) => {
  const {
    showDropArea = true,
    onUpload = (props: onUploadProps) => {},
    onProcessed = (processed: boolean) => {},
    title = 'Загрузить',
    processed: externalProcessed = false,
  } = props;

  const [reader, setReader] = useState<string | undefined>(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,

    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onloadend = () => setReader(reader.result?.toString());
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const { uploadRef = useRef(), ...rootProps } = getRootProps();
  const [processed, setProcessed] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    onProcessed(processed);
  }, [processed]);

  useEffect(() => {
    if (reader) {
      let type: string | null = null,
        ext: string | null = null;
      try {
        [type, ext] = reader.split(':')[1].split(';')[0].split('/');
      } catch (e) {
        console.error('not parse base64', e);
      }

      if (type !== 'image') {
        onUpload({ type, ext, url: reader });
        return;
      }

      setProcessed(true);
      // updateRepo(500, () => {
      const image = new Image();
      // image.onload = function () {
      //   EXIF.getData(image, () => {
      //     const canvas = setOrientation(this);
      //     setProcessed(false);
      //     onUpload({
      //       type,
      //       ext,
      //       url: canvas?.toDataURL('image/jpeg') ?? '',
      //     });
      //   });
      // };
      image.src = reader;
    }
    return () => {
      setReader(undefined);
    };
  }, [reader]);

  return (
    <>
      <Fade in={showDropArea} unmountOnExit={true}>
        <Box>
          <RootRef rootRef={uploadRef}>
            <Box {...rootProps}>
              <input {...getInputProps()} disabled={processed || externalProcessed} />
              <Box className={classes.dropArea} p={1}>
                {title}
              </Box>
            </Box>
          </RootRef>
        </Box>
      </Fade>
    </>
  );
};
