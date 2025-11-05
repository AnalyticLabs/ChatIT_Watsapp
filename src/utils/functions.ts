import { showMessage } from 'react-native-flash-message';
import RNFS from 'react-native-fs';
import { COLORS } from './constants';
import { styles } from '../assets/styles';
import { fontValue } from './responsiveFonts';


export const logToConsole = (...args: any) => {
  if (__DEV__ && console.tron) {
    console.tron.log(...args);
  } else {
    console.log(...args);
  }
};


const getSignedUrl = async (fileCount: number) => {
  try {
    const response = await homeSignedUrlService(`?fileCount=${fileCount}`)
    return response.data.data;
  } catch (err) {
    logToConsole(err, 'error--in signed url', err?.response?.data);
    return [];
  }
};

export const uploadFile = async (
  media: any,
  type: string, // 'image' or 'video'
  primaryIndex?: number
) => {
  try {
    let files = Array.isArray(media) ? media : [media];

    const filePaths = files.filter(file =>
      typeof file === 'string' &&
      (file.startsWith('file://') || file.startsWith('/') || file.startsWith('content://'))
    );

    const signedUrls = await getSignedUrl(filePaths.length);

    const uploadPromises = filePaths.map(async (file, index) => {
      const obj = signedUrls[index];
      let localPath = file.replace('file://', '');

      // Handle content:// URIs (Android)
      if (Platform.OS === 'android' && file.startsWith('content://')) {
        const destPath = `${RNFS.TemporaryDirectoryPath}/upload-${Date.now()}-${index}`;
        try {
          await RNFS.copyFile(file, destPath);
          localPath = destPath;
        } catch (copyErr) {
          console.error('Failed to copy file from content URI:', copyErr);
          return '';
        }
      }

      const fileExt = localPath.split('.').pop()?.toLowerCase() || 'octet-stream';
      const mimeType = getMimeTypeFromExtension(fileExt);

      try {
        // Read file in base64
        const base64Data = await RNFS.readFile(localPath, 'base64');

        const response = await fetch(obj.url, {
          method: 'PUT',
          headers: {
            'Content-Type': mimeType,
            // DO NOT include Content-Encoding unless your backend expects base64
            // 'Content-Encoding': 'base64',
          },
          body: base64ToUint8Array(base64Data),
        });

        if (!response.ok) {
          console.error('Upload failed:', await response.text());
          return '';
        }

        if (primaryIndex !== undefined) {
          return {
            filename: obj.filename,
            isPrimary: index === primaryIndex,
          };
        }

        return obj.filename;

      } catch (uploadErr) {
        console.error('Upload error:', uploadErr);
        return '';
      }
    });

    const filenames = await Promise.all(uploadPromises);
    return { status: true, data: filenames };

  } catch (err: any) {
    console.error("Upload error:", err.message);
    return {
      status: false,
      message: err?.response?.data || 'Something went wrong while uploading files.',
    };
  }
};

export const showSuccessToast = async (msg: string) => {
  showMessage({
    message: msg,
    type: 'success',
    backgroundColor: COLORS.primary,
    color: COLORS.black,
    icon: 'success',
    iconProps: {
      tintColor: COLORS.black,
    },
    floating: true,
    style: {
      alignItems: 'center',
      gap: fontValue(5),
    },
    titleStyle: { ...styles.poppinsMedium },
  });
};


export const showErrorToast = async (msg: string) => {
  showMessage({
    message: msg,
    type: 'danger',
    backgroundColor: COLORS.red,
    color: COLORS.white,
    icon: 'danger',
    floating: true,
    style: {
      alignItems: 'center',
      gap: fontValue(5),
    },
    titleStyle: { ...styles.poppinsMedium },
  });
};
