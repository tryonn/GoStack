import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function App() {

    const [projects, setProducts] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProducts(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo Projects:::: ==> ${Date.now()}`,
            owner: 'Simão Menezes'
        });

        const project = response.data;

        setProducts([...projects, project]);
    }

    return (

        <>

        <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
        <SafeAreaView style={styles.container}>
        <FlatList
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({ item: project }) => (
                <Text style={styles.project} key={project.id}>{project.title}</Text>
            )}
        />

        <TouchableOpacity activeOpacity={0.6} style={styles.button}>
            <Text style={styles.buttonText}>Adicionar Project</Text>
        </TouchableOpacity>


        </SafeAreaView>
            {
                /*<View style={styles.container}>
                projects.map(project => (
                <Text style={styles.project} key={project.id}>{project.title}</Text>
                ))
                </View>
                */
            }

        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        //justifyContent: 'center',
        //alignItems: 'center'
    },

    project: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

// adb reverse tcp:3333 tcp:3333