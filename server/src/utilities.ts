import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import sizeOf from 'image-size'
import { IMimeTypes, IImageDimensions } from './types'
import config from './config'

export const mimeTypes: IMimeTypes = {
  gif: 'image/gif',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  mp4: 'video/mp4'
}

export function getFileName (filePath: string) {
  const fileName = filePath.replace(/^.*[\\\/]/, '')
  if (fileName) {
    return fileName
  }
  return ''
}

export function getFileExtension (fileName: string) {
  const regex = /(?:\.([^.]+))?$/
  const fileExtension = regex.exec(fileName) // "txt"
  if (fileExtension && fileExtension[1]) {
    return fileExtension[1]
  }
  return ''
}

export function removeFileExtension (fileName: string) {
  const fileExtension = getFileExtension(fileName)
  return fileName.replace(`.${fileExtension}`, '')
}

export function updateFileName (prevFileName: string, newFileName: string) {
  const fileExtension = getFileExtension(prevFileName)
  const fileNameWithoutExt = removeFileExtension(newFileName)
  return `${fileNameWithoutExt}.${fileExtension}`
}

export function appendToFileName (prevFileName: string, toAppend: string) {
  const fileExtension = getFileExtension(prevFileName)
  const fileNameWithoutExt = removeFileExtension(prevFileName)
  return `${fileNameWithoutExt}${toAppend}.${fileExtension}`
}

export function getMimeType (fileName: string) {
  const fileExtension = getFileExtension(fileName)
  const mimeType = mimeTypes[fileExtension]
  if (mimeType) {
    return mimeType
  }
  return ''
}

export function getBase64ImgSrc (base64: string, mime: string) {
  const prefix = `data:${mime};base64,`
  const imgSrc = `${prefix}${base64}`
  return imgSrc
}

export function isImage (filePath: string) {
  return /\.(jpe?g|png|gif|bmp)$/i.test(filePath)
}

export function getImageSize (filePath: string): Promise<IImageDimensions> {
  return new Promise((resolve, reject) => {
    sizeOf(filePath, function (err, dimensions) {
      if (err) {
        reject(err)
      }
      resolve({
        width: dimensions.width,
        height: dimensions.height
      })
    })
  })
}

export function calcResize (dimensions: IImageDimensions, maximum: number) {
  let result: any = {
    width: dimensions.width,
    height: dimensions.height
  }
  const maxDimension = Math.max(...Object.values(dimensions))
  if (maxDimension > maximum) {
    let maxKey = ''
    let minKey = ''

    const keys = Object.keys(dimensions)

    keys.forEach((key: string) => {
      if (dimensions[key] === maxDimension) {
        maxKey = key
      } else {
        minKey = key
      }
    })
    const ratio = dimensions[maxKey] / dimensions[minKey]
    result = {
      [maxKey]: maximum,
      [minKey]: maximum / ratio
    }
  }
  return result
}

export function resizeImage (
  filePath: string,
  maximum: number
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const dimensions = await getImageSize(filePath)
    const newDimensions = calcResize(dimensions, maximum)
    if (newDimensions.width === dimensions.width) {
      resolve(filePath)
    }
    const prevFileName = getFileName(filePath)
    const fileName = appendToFileName(
      prevFileName.replace(/-\w+/i, ''),
      `-${Date.now()}`
    )
    const outputPath = path.join(config.tempPath, fileName)
    sharp(filePath)
      .resize(newDimensions)
      .toFile(outputPath, async err => {
        if (err) {
          reject(err)
        }
        await deleteFile(filePath)
        resolve(outputPath)
      })
  })
}

export function deleteFile (filePath: string) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

export function uuid (): string {
  const result: string = ((a?: any, b?: any) => {
    for (
      b = a = '';
      a++ < 36;
      b +=
        (a * 51) & 52
          ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16)
          : '-'
    ) {
      // empty
    }
    return b
  })()
  return result
}
