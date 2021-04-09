import React, { useRef, useContext, useEffect, useMemo } from 'react';
import * as d3Selection from 'd3-selection';
import * as d3Path from 'd3-path';
import { GeoContext } from '../../container/geo';
import { hasNaN, validNumber } from '../../utils/utils';
import { computeControllPoint } from './utils';
import { CurvePoints, LinesData, LinesModel, LinesStyle } from './types';
import { AnimationProps } from '../../animation/types';
import { pathLoading } from '../../animation/loading';
import defaultAnimationProps from '../../animation';

interface LinesProps extends AnimationProps {
  data?: LinesData[];
  curve?: number | string;
  style?: LinesStyle;
}

const Lines: React.FC<LinesProps> = (props: LinesProps) => {
  const { data, style, curve, ...rest } = props;
  const { animation, animationTime } = { ...defaultAnimationProps, ...rest };
  const ref = useRef<SVGGElement>(null);
  const { projection } = useContext(GeoContext);
  const model = useMemo<LinesModel>(() => {
    if (data && projection) {
      const validData = data.filter(
        (v) => JSON.stringify(v.start) !== JSON.stringify(v.end)
      );
      const points: CurvePoints[] = [];
      const paths: string[] = validData.map((v) => {
        const { start = [0, 0], end = [0, 0] } = v;
        const p0 = projection(start) || [0, 0]; // 起始点投影坐标
        const p1 = projection(end) || [0, 0]; // 终止点投影坐标
        if (hasNaN(p0) || hasNaN(p1)) {
          return '';
        }
        const ctlPnt = computeControllPoint(p0, p1, validNumber(curve));
        points.push([p0, ctlPnt, p1]);
        const path = d3Path.path();
        path.moveTo(p0[0], p0[1]);
        path.quadraticCurveTo(ctlPnt[0], ctlPnt[1], p1[0], p1[1]);
        return path.toString();
      });
      return {
        paths,
        points,
      };
    }
    return {};
  }, [data, projection, curve]);

  useEffect(() => {
    if (ref.current && model.paths) {
      const el = d3Selection
        .select(ref.current)
        .selectAll<SVGPathElement, unknown>('path')
        .data(model.paths)
        .join('path')
        .attr('d', function (data) {
          return data;
        })
        .attr('fill', 'none')
        .attr('stroke', function () {
          return style?.color || '#000';
        })
        .attr('stroke-width', function () {
          return style?.width || 1;
        });
      animation && pathLoading(el, validNumber(animationTime));
    }
  }, [model, style, animationTime, animation]);

  return (
    <>
      <g ref={ref} />
    </>
  );
};

export default Lines;

export * from './types';
