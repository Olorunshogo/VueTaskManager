
import type { VNodeRef } from "vue";

export function vueRefAdapter(refFn: (element: HTMLElement | null) => void): VNodeRef {
  return ((el: any) => refFn(el instanceof HTMLElement ? el : null)) as VNodeRef;
}