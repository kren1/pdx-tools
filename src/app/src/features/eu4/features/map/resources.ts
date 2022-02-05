import { defaultVersion, resources } from "@/lib/url_gen";
import {
  loadImage,
  StaticResources,
  TerrainOverlayResources,
} from "../../../../map/staticResources";
import type { ShaderSource } from "../../../../map/types";
import { glContextOptions } from "../../../../map/map";
import { MapOnlyControls } from "../../types/map";

export interface Resources {
  static: StaticResources;
  provincesUniqueIndex: Uint16Array;
}

export async function shaderUrls(): Promise<ShaderSource[]> {
  const promises = {
    mapVertexShader: fetch(
      require(`../../../../../../map/assets/shaders/map.vert`)
    ).then((x) => x.text()),
    mapFargmentShader: fetch(
      require(`../../../../../../map/assets/shaders/map.frag`)
    ).then((x) => x.text()),
    xbrVertexShader: fetch(
      require(`../../../../../../map/assets/shaders/xbr.vert`)
    ).then((x) => x.text()),
    xbrFargmentShader: fetch(
      require(`../../../../../../map/assets/shaders/xbr.frag`)
    ).then((x) => x.text()),
  };

  return [
    {
      vertex: await promises.mapVertexShader,
      fragment: await promises.mapFargmentShader,
    },
    {
      vertex: await promises.xbrVertexShader,
      fragment: await promises.xbrFargmentShader,
    },
  ];
}

export async function loadTerrainOverlayImages(
  version: string
): Promise<TerrainOverlayResources> {
  const url = resources[version] ?? resources[defaultVersion];

  const promises = {
    colorMap: loadImage(url.colorMap),
    sea: loadImage(url.sea),
    normal: loadImage(url.normal),
    rivers1: loadImage(url.rivers1),
    rivers2: loadImage(url.rivers2),
    water: loadImage(url.water),
    surfaceRock: loadImage(url.surfaceRock),
    surfaceGreen: loadImage(url.surfaceGreen),
    surfaceNormalRock: loadImage(url.surfaceNormalRock),
    surfaceNormalGreen: loadImage(url.surfaceNormalGreen),
    heightmap: loadImage(url.heightmap),
  };

  return {
    colorMap: await promises.colorMap,
    sea: await promises.sea,
    normal: await promises.normal,
    rivers1: await promises.rivers1,
    rivers2: await promises.rivers2,
    water: await promises.water,
    surfaceRock: await promises.surfaceRock,
    surfaceGreen: await promises.surfaceGreen,
    surfaceNormalRock: await promises.surfaceNormalRock,
    surfaceNormalGreen: await promises.surfaceNormalGreen,
    heightMap: await promises.heightmap,
  };
}

export async function resourceUrls(version: string): Promise<Resources> {
  const url = resources[version] ?? resources[defaultVersion];

  const promises = {
    provinces1: loadImage(url.provinces1),
    provinces2: loadImage(url.provinces2),
    terrain1: loadImage(url.terrain1),
    terrain2: loadImage(url.terrain2),
    stripes: loadImage(url.stripes),
    provincesUniqueColor: fetch(url.provincesUniqueColor)
      .then((x) => x.arrayBuffer())
      .then((x) => new Uint8Array(x)),
    provincesUniqueIndex: fetch(url.provincesUniqueIndex)
      .then((x) => x.arrayBuffer())
      .then((x) => new Uint16Array(x)),
  };

  return {
    static: {
      provinces1: await promises.provinces1,
      provinces2: await promises.provinces2,
      terrain1: await promises.terrain1,
      terrain2: await promises.terrain2,
      stripes: await promises.stripes,
      provincesUniqueColor: await promises.provincesUniqueColor,
    },
    provincesUniqueIndex: await promises.provincesUniqueIndex,
  };
}

export function glContext(
  canvas: HTMLCanvasElement
): WebGL2RenderingContext | null {
  return canvas.getContext("webgl2", glContextOptions());
}

export function setMapControls(map: any, controls: MapOnlyControls) {
  map.showProvinceBorders = controls.showProvinceBorders;
  map.showMapModeBorders = controls.showMapModeBorders;
  map.showCountryBorders = controls.showCountryBorders;
  map.renderTerrain = controls.showTerrain;
}

export function provinceIdToColorIndexInvert(
  provinceIdToColorIndex: Uint16Array
) {
  const colorIndexToProvinceId = new Uint16Array(provinceIdToColorIndex.length);
  for (let i = 0; i < provinceIdToColorIndex.length; i++) {
    colorIndexToProvinceId[provinceIdToColorIndex[i]] = i;
  }
  return colorIndexToProvinceId;
}
