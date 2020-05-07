import React from 'react';

import { useAuth } from '../../hook/Auth';

import { View, Button } from 'react-native';


const Dashboard: React.FC = () => {

    const { singnOut } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>

            <Button title="Sair pode" onPress={singnOut}/>

        </View>
    )
};


export default Dashboard;
