import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';

export const provideTranslation = (): EnvironmentProviders => {
    return makeEnvironmentProviders([
        importProvidersFrom(
            TranslateModule.forRoot()
        ),
        ...provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json'
        })
    ]);
};
