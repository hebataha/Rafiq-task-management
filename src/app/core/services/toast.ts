import { Service, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Service()

export class ToastService {
    toast = signal<{
        message: string;
        type: ToastType;
    } | null>(null);

    show(message: string, type: ToastType) {
        this.toast.set(
            {
                message: message,
                type: type
            }

        )


    }

    hide() {
        this.toast.set(null)
    }
}
