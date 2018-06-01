import {APP_ID, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';

declare function require(name: string);

// console.log('********************', config)

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    config = null;

    CONFIG_KEY = makeStateKey('config');

    constructor(private state: TransferState) {
        this.config = this.state.get(this.CONFIG_KEY, null as any);
        if (!this.config) {
            const config = require('../../config');
            this.state.set(this.CONFIG_KEY, config);
            this.config = config;
        }
    }
}
