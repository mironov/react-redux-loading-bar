import { Component, CSSProperties } from 'react';
import { Middleware, Reducer, Action } from 'redux';

export interface LoadingBarContainerProps {
  scope?: string
  style?: CSSProperties;
  className?: string;
  actions?: Object;
  updateTime?: number;
  maxProgress?: number;
  progressIncrease?: number;
  showFastActions?: boolean;
}
export default class LoadingBarContainer extends Component<LoadingBarContainerProps, {}> {}

export interface LoadingBarProps extends LoadingBarContainerProps {
  loading?: number;
}
export class LoadingBar extends Component<LoadingBarProps, {}> {}
export class ImmutableLoadingBar extends Component<LoadingBarContainerProps, {}> {}

export interface MiddlewareConfig {
  scope?: string
  promiseTypeSuffixes?: string[];
}
export function loadingBarMiddleware(config?: MiddlewareConfig): Middleware;

export const loadingBarReducer: Reducer<any>;
export function showLoading(scope?: string): Action;
export function hideLoading(scope?: string): Action;
export function resetLoading(scope?: string): Action;
