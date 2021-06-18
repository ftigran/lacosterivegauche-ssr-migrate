import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  makeStyles,
  Fade,
  useMediaQuery,
  Theme,
  Button,
  IconButton,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import jsQR from 'jsqr';
import { upload as uploadAction, codeRegister as codeRegisterAction } from '../../api/actions';
import { ApiAnswerStatus } from '../../api/types';
import { Close as CloseIcon } from '@material-ui/icons';
import Upload, { onUploadProps } from '../../components/upload';
import Snackbar, { SnackbarProps, SnackBarTypeMessage } from '../../components/snackbar';
import Alert, { AlertProps } from '../../components/alert';
import RefundForm from './RefundForm';
import { ga, CATEGORY, ACTION } from '../../components/ga';
import font from '../../theme/font';
import UploadImg from '../../imgs/woolite/upload-icon.png';
import { FormSubmitHandler } from 'redux-form';
import { FormData, PropsComponent } from './RefundForm/type';
import { colors } from '../../theme/theme';
import { getMessageString } from '../../utils/message';
import QrScanner from 'qr-scanner';

//
interface Props {
  onRegister?: () => void;
  handleDocInfo?: () => void;
  onProcessed?: (r: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  uploadContainer: {},

  previewImageContainer: {
    position: 'relative',
  },
  uploadProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  qrReader: {
    maxWidth: '100%',
    border: '2px solid rgba(255,255,255,1)',
    margin: '0 auto',
    position: 'relative',
  },
  checkInfoText: {
    color: colors.GREY2,
    fontSize: '100%',
    fontFamily: font.primary,
  },
  reqdoc: {
    textDecoration: 'underline',
    color: colors.GREY2,
    fontFamily: font.primary,
    fontSize: '80%',
    cursor: 'pointer',
  },
}));

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};

// let myReq = null;

export default (props: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const { onProcessed = (r: boolean) => {}, onRegister = () => {} } = props;
  const [alertProps, setAlertProps] = useState<AlertProps>({
    open: false,
    result: false,
  });
  const classes = useStyles();
  const [uploadInfo, setUploadInfo] = useState<any>(undefined);
  const [file, setFile] = useState<onUploadProps>();
  const [uploadProcessed, setUploadProcessed] = useState(false);
  const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
    show: false,
    message: undefined,
    showApiAnswerMessage: true,
    apiAnswerMessage: undefined,
    onClose: () => {
      setSbnackbarProps({ ...snackbarProps, show: false });
    },
  });

  const myReq = useRef<number | undefined>(undefined);

  const [isCameraScan, setIsCameraScan] = useState<boolean>(false);
  const [isStep1Form, setIsStep1Form] = useState<boolean>(false);
  const [formDataRefund, setFormDataRefund] = useState<FormData | undefined>(undefined);
  const [hasCameraCheck, setHasCameraCheck] = useState<boolean>(false);
  const [progressRegisterFromCamera, setProgressRegisterFromCamera] = useState<boolean>(false);
  const [noValidQr, setNoValidQr] = useState<string | undefined>(undefined);

  const handleScan = (data: string) => {
    if (data) {
      console.log(data);

      let _codeClear = undefined;

      if (/^http.*vkey\-codes.ru\//.test(data)) {
        _codeClear = data.replace(/^http.*vkey\-codes.ru\//, '');
      }

      if (/^http.*\/c\//.test(data)) {
        _codeClear = data.replace(/^.*\/c\//, '');
      }

      if (_codeClear) {
        setNoValidQr(undefined);
        // const codeClear = data.replace(/^.*\/c\//, '');
        const codeClear = _codeClear;
        // onSuccess({
        //   result: true,
        //   open: true,
        //   message: codeClear,
        //   data: {},
        // });
        (async () => {
          setProgressRegisterFromCamera(true);
          try {
            const r = await codeRegisterAction(codeClear);
            onSuccess({
              result: true,
              open: true,
              message: getMessageString(r.data?.message),
            });

            try {
              ga.send(CATEGORY.Qr, ACTION.camera_download, getMessageString(r.data?.message));
            } catch (ex) {}
          } catch (e) {
          } finally {
            setProgressRegisterFromCamera(false);
          }
        })();
      } else {
        setNoValidQr('Отсканируйте акционный код, находящийся под крышкой Valio');
      }
    }
  };

  let canvas: {
    beginPath: () => void;
    moveTo: (arg0: any, arg1: any) => void;
    lineTo: (arg0: any, arg1: any) => void;
    lineWidth: number;
    strokeStyle: any;
    stroke: () => void;
    drawImage: (
      arg0: HTMLVideoElement,
      arg1: number,
      arg2: number,
      arg3: number,
      arg4: number,
    ) => void;
    getImageData: (arg0: number, arg1: number, arg2: number, arg3: number) => any;
  };
  let canvasElement: HTMLCanvasElement | null;

  const tick = () => {
    if (
      videoRef != null &&
      videoRef.current != null &&
      videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
    ) {
      if (canvasElement) {
        canvasElement.height = videoRef.current.videoHeight;
        canvasElement.width = videoRef.current.videoWidth;
      }

      canvas.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current.videoWidth,
        videoRef.current.videoHeight,
      );

      let imageData = canvas.getImageData(
        0,
        0,
        videoRef.current.videoWidth,
        videoRef.current.videoHeight,
      );
      let code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        handleScan(code.data);
      } else {
        QrScanner.scanImage(imageData.data)
          .then((result) => handleScan(result))
          .catch((error) => console.log(error || 'No QR code found.'));
      }
    }
  };

  const disableStream = () => {
    myReq.current && cancelAnimationFrame(myReq.current);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      // timerId && clearInterval(timerId);
      if (videoRef != null && videoRef.current != null) {
        videoRef.current.pause();
      }
    }
  };

  const enableStream = () => {
    try {
      navigator.mediaDevices
        .getUserMedia(CAPTURE_OPTIONS)
        .then((r) => {
          setStream(r);
          setIsCameraScan(true);
          // setType('ONLINE');
          // setMessage(undefined);
          // setProcessed(false);
          canvasElement = canvasEl.current;
          // @ts-ignore
          canvas = canvasElement?.getContext('2d');
          // @ts-ignore
          videoRef.current.srcObject = r;
          // @ts-ignore
          videoRef.current.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
          // @ts-ignore
          videoRef.current.play();
          setInterval(() => {
            myReq.current = requestAnimationFrame(tick);
          }, 700);
        })
        .catch((err) => {
          // setMessage(undefined);
          // setType(undefined);
          // setProcessed(false);
          console.log(err);
        })
        .finally(() => {
          setHasCameraCheck(true);
        });
    } catch (err) {
      // setMessage(undefined);
      // setType(undefined);
      // setProcessed(false);
      // alert(err);
      console.log(err);
      setHasCameraCheck(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      enableStream();
    }, 1000);
  }, []);

  function onSuccess(alertProps: AlertProps) {
    console.log('registerCheck onSuccess', alertProps);
    setAlertProps(alertProps);
  }

  function onCloseAlert(r: boolean, data: any) {
    if (r) {
      setUploadInfo(undefined);
      setFile(undefined);

      setAlertProps({ ...alertProps, open: false, result: false });
      onRegister();
    }
  }

  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    console.log('uploadFile present', !!file);
    setSbnackbarProps({ ...snackbarProps, show: false });
    setUploadInfo(undefined);
    if (file) {
      setUploadProcessed(true);
      // uploadAction({ check: convertBase64ToBlob(file?.url) })
      uploadAction({ base64: file?.url })
        .then((r) => {
          try {
            ga.send(
              CATEGORY.Qr,
              ACTION.download_check,
              r.data?.status?.toString() ?? '0',
              Object.values(r.data?.message).join(','),
            );
          } catch (err) {
            console.log('CATEGORY.Check ACTION.download_check err: ', err);
          }
          if (r.data?.status !== ApiAnswerStatus.SUCCESS) {
            setSbnackbarProps({
              ...snackbarProps,
              type:
                r.status === ApiAnswerStatus.ERROR
                  ? SnackBarTypeMessage.ERROR
                  : SnackBarTypeMessage.WARNING,
              show: true,
              apiAnswerMessage: r.data?.message,
            });
          } else {
            // setUploadInfo({
            //   message: getMessageString(r.data?.message),
            //   status: r.data?.status ?? 0,
            // });
            onSuccess({
              result: true,
              open: true,
              messages: r.data?.message,
              data: r.data?.data,
            });
          }
        })
        .finally(() => {
          setUploadProcessed(false);
        });
    }
  }, [file]);

  const handleOnSubmitStep1 = useCallback<FormSubmitHandler<FormData, PropsComponent>>((form) => {
    // console.log('handleOnSubmitStep1 form: ', form);
    setFormDataRefund(form);
    setIsStep1Form(false);
  }, []);

  const { handleDocInfo } = props;

  const handleDocInfoCallback = useCallback(() => {
    handleDocInfo && handleDocInfo();
  }, [handleDocInfo]);

  return (
    <>
      {isStep1Form && (
        <Grid container>
          <Grid item xs={12}>
            <RefundForm processed={false} onSubmit={handleOnSubmitStep1} />
          </Grid>
        </Grid>
      )}
      {(progressRegisterFromCamera || !hasCameraCheck) && !isStep1Form && (
        <Box p={5}>
          <CircularProgress color={'primary'} />
        </Box>
      )}
      {isCameraScan && !progressRegisterFromCamera && (
        <Grid container>
          <Grid item xs={12}>
            <p>Наведи камеру на QR-код</p>
            <Box className={classes.qrReader}>
              <video width={'70%'} ref={videoRef} />
              <canvas style={{ width: '100%', display: 'none' }} width={'100%'} ref={canvasEl} />
            </Box>
            {noValidQr !== undefined && (
              <Box color={'#ff0000'} fontSize={12}>
                {noValidQr}
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <p>QR-код не считывается?</p>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => {
                disableStream();
                setIsCameraScan(false);
              }}
            >
              Загрузить фотографию
            </Button>
          </Grid>
        </Grid>
      )}
      {hasCameraCheck && !isCameraScan && (
        <Box display="flex" flexDirection="row" alignItems="stretch" justifyContent="stretch">
          <Box
            flex="1 1 auto"
            className={classes.uploadContainer}
            mx={xs ? 0 : sm ? 'auto' : 0}
            maxWidth={xs ? '100%' : sm ? '75%' : '100%'}
          >
            <Box>
              <Box
                style={{
                  // backgroundColor: '#fff',
                  borderRadius: 0,
                }}
                p={2}
                textAlign="center"
              >
                <Box px={sm ? 0 : 1} mt={2}>
                  {!!file?.url && (
                    <Box
                      maxWidth="50%"
                      maxHeight="50%"
                      mx="auto"
                      className={classes.previewImageContainer}
                    >
                      <img
                        src={file?.url ?? ''}
                        alt="preview"
                        style={{
                          maxHeight: '100%',
                          width: '100%',
                        }}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        className={classes.uploadProgress}
                      >
                        <Fade in={uploadProcessed}>
                          <Box flex="0 0 auto">
                            <CircularProgress color="secondary" size={24} />
                          </Box>
                        </Fade>
                        <Fade in={!!file && !uploadProcessed}>
                          <Box flex="0 0 auto" position="absolute" top={0} right={0}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setFile(undefined);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Fade>
                      </Box>
                    </Box>
                  )}
                  {/* <Box className={classes.checkInfoText} mb={2}>*/}
                  {/*  В чеке должно быть минимум два акционных продукта. На фото должно быть четко*/}
                  {/*  видно QR-код и данные чека*/}
                  {/* </Box> */}

                  {/* <Box className={classes.reqdoc} onClick={handleDocInfoCallback} mt={1} mb={3}> */}
                  {/*  Рекомендуем посмотреть*/}
                  {/*  <br />*/}
                  {/*  требования к чеку*/}
                  {/* </Box> */}
                  <Upload
                    showDropArea={!file}
                    onUpload={(res: onUploadProps) => setFile(res)}
                    title={
                      <>
                        <Box fontFamily={font.secondary} fontWeight="normal" fontSize="80%" p={1}>
                          <span
                            style={{
                              fontWeight: 'bold',
                              textDecoration: 'underline',
                            }}
                          >
                            Загрузи
                          </span>{' '}
                          или перетяни сюда фото QR-кода
                        </Box>

                        <Box fontSize="60%" fontFamily={font.secondary} p={1}>
                          <Grid container justify="center" alignItems="center">
                            <Grid item>
                              <img
                                src={UploadImg}
                                style={{ width: 52, height: 59, marginRight: 12 }}
                              />
                            </Grid>
                            <Grid item>
                              На фото должен быть четко
                              <br />
                              виден QR-код
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    }
                  />
                  <Snackbar {...snackbarProps} mt={2} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Alert {...alertProps} onClose={onCloseAlert} />
    </>
  );
};
