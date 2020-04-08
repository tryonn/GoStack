const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());

app.use(express.json());


const projects = [];


function logRequest(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()} ${url}]`;

    console.log(logLabel);

    return next();
}

function validateProjectId(request, response, next){

    const { id } = request.params;

    if (!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID' });
    }

    return next();

}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', logRequest, (request, response) => {
    const { title, owner } = request.query;

    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner };
    projects.push(project);

    return response.json(project)
});

app.put('/projects/:id', (request, response) => {

    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);
    if (projectIndex < 0 ){
        return response.status(400).json({ error: ' Project not founf!' });
    }
    const project = {
        id, 
        title,
        owner
    }
    projects[projectIndex] = project;
    return response.json(project);
});


app.delete('/projects/:id', (request, response) => {

    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);
    if (projectIndex < 0 ){
        return response.status(400).json({ error: ' Project not founf!' });
    }

    projects.splice(projectIndex, 1);

    return response.status(402).send()
});



app.listen(3333, () => {
    console.log('🐱‍🏍 -> Back-end starter!');
});