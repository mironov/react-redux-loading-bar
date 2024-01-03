import { Component, CSSProperties } from 'react';
import { Middleware, Reducer, Action } from 'redux';

export const DEFAULT_SCOPE: string;
export const HIDE: string;
export const SHOW: string;
export const RESET: string;

export interface LoadingBarContainerProps {
  className?: string;
  direction?: string;
  maxProgress?: number;
  progressIncrease?: number;
  scope?: string;
  showFastActions?: boolean;
  style?: CSSProperties;
  updateTime?: number;
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
