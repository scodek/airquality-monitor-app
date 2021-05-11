import { notification } from 'antd';
import { AlertEnums } from '../enums/AlertEnums';

export const loadingNotification = (statusEnum: AlertEnums, status?:any, statusText?:string) => {
    if (statusEnum === AlertEnums.SUCCESS) {
        notification.success({
            message: status ? status : 'Success',
            description: statusText ? statusText : 'Network transmission successful!',
            placement: 'bottomLeft',
            duration: 8,
            style: { color: 'green' }
        });
    } else if (statusEnum === AlertEnums.ERROR) {
        notification.error({
            message: status ? status : 'Error',
            description: statusText ? statusText : 'Error occurred',
            placement: 'bottomLeft',
            duration: 8,
            style: { color: 'red' }
        });
    } 
};
