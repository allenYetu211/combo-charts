/*
 * @Description: 飞线动画
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-09 15:17:47
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-14 14:24:02
 */
import React, { useEffect, useRef } from 'react';
import { CurvePoints, LinesStyle } from '.';
import * as d3Selection from 'd3-selection';
import Linear from '../_utils/Linear';
import { bezier } from './utils';
import { Coordinate } from '../_utils/types';

interface MotionPropsType {
  mark?: string;
  paths?: string[];
  points?: CurvePoints[];
  duration?: number | string;
  style?: LinesStyle;
}

const Motion: React.FC<MotionPropsType> = (props: MotionPropsType) => {
  const { mark, duration, paths, points, style } = props;
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (ref.current && paths && points) {
      const b = d3Selection.select(ref.current);
      const group = b.selectAll('g').data(paths).join('g');
      if (group.selectChild('path').empty()) {
        group.append('path');
      }
      if (group.selectChild('g').empty()) {
        group.append('g');
      }
      const p = group
        .selectChild('path')
        .attr('d', function (data) {
          return data;
        })
        .attr('fill', 'none')
        .attr('stroke', () => style?.color || null)
        .attr('stroke-width', () => style?.width || null);
      const m = group.selectChild('g');
      if (mark) {
        m.data([mark])
          .join('g')
          .selectAll('image')
          .data(function (data) {
            return [data];
          })
          .join('image')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 24)
          .attr('height', 24)
          .attr('xlink:href', function (data) {
            return data;
          });
      } else {
        m.data([4])
          .join('g')
          .selectAll('circle')
          .data(function (data) {
            return [data];
          })
          .join('circle')
          .attr('cx', function (data) {
            return data;
          })
          .attr('cy', function (data) {
            return data;
          })
          .attr('r', function (data) {
            return data;
          })
          .attr('fill', () => style?.color || null);
      }
      let start = +new Date();
      p.attr('stroke-dasharray', function () {
        const totalLength = (this as SVGPathElement).getTotalLength();
        return `${totalLength} ${totalLength}`;
      });
      const d = Number(duration) || 3000;
      timer = setInterval(() => {
        const t = +new Date();
        const dis = t - start;
        if (dis > d) {
          start = t;
          p.attr('stroke-dasharray', function () {
            const totalLength = (this as SVGPathElement).getTotalLength();
            return `${totalLength} ${totalLength}`;
          });
        } else {
          const per = dis / d;
          p.each(function (_, i) {
            const parent = d3Selection.select(
              (this as SVGPathElement).parentElement
            );
            const totalLength = (this as SVGPathElement).getTotalLength();
            const current = (1 - per) * totalLength;
            const current2 = per * totalLength;
            d3Selection.select(this).attr('stroke-dashoffset', function () {
              return current;
            });
            const point = (this as SVGPathElement).getPointAtLength(current2);
            const selectG = parent.select('g');
            const el = selectG.node() as SVGGElement;
            const bbox = el.getBBox();
            const [p0, p1, p2] = points[i] || [
              [0, 0],
              [0, 0],
              [0, 0],
            ];
            const q0 = bezier(p0, p1, per);
            const q1 = bezier(p1, p2, per);
            const line = new Linear(q0, q1);
            const [line0, line1] = line.parallel(bbox.width / 2);
            const line2 = line.perpendicular();
            line2.c = -line2.k * point.x + point.y;
            const [line3, line4] = line2.parallel(bbox.height / 2);
            const angle = line.getAngle('deg');
            let a = angle;
            const vector: Coordinate = [q1[0] - q0[0], q1[1] - q0[1]];
            const maxC1 = Math.max(line0.c, line1.c);
            const maxC2 = Math.max(line3.c, line4.c);
            const minC1 = Math.min(line0.c, line1.c);
            const minC2 = Math.min(line3.c, line4.c);
            if (vector[0] > 0 && vector[1] > 0) {
              // 方向为右下，此时angle必然大于0
              a = angle - 90;
              line.c = maxC1;
              line2.c = minC2;
            } else if (vector[0] > 0 && vector[1] < 0) {
              // 方向为右上，angle必然小于0
              a = -90 + angle;
              line.c = maxC1;
              line2.c = maxC2;
            } else if (vector[0] < 0 && vector[1] > 0) {
              // 方向为左下，angle必然小于0
              a = 90 + angle;
              line.c = minC1;
              line2.c = minC2;
            } else if (vector[0] < 0 && vector[1] < 0) {
              // 方向为左上，angle必然大于0
              a = 90 + angle;
              line.c = minC1;
              line2.c = maxC2;
            }
            const res = line.intersection(line2);
            selectG.attr(
              'transform',
              `translate(${res ? res[0] : 0}, ${res ? res[1] : 0}) rotate(${a})`
            );
          });
        }
      }, 40);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    };
  }, [points, paths, style, mark, duration]);

  return <g ref={ref} />;
};

export default Motion;
