import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
    })
        .then((res) => {
            console.log('Permission: ', res);
            Contacts.getAll()
                .then((contacts) => {
                    // work with contacts
                    console.log(contacts);
                })
                .catch((e) => {
                    console.log(e);
                });
        })
        .catch((error) => {
            console.error('Permission error: ', error);
        });