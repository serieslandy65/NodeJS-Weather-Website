const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()


// Define paths for Epress config
const publicDirectoryPath = path.join(__dirname, '../')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>
{
    res.render('index', 
    {
        title: 'Weather app',
        name: 'Rory'
    })
})


app.get('/about', (req, res) =>
{
    res.render('about',
    {
        title: 'About me',
        name: 'Rory',
    })
})


app.get('/help', (req, res) => 
{
    res.render('help',
    {
        title: 'Help',
        helpText: 'So you need help?',
        name: 'Rory',
    })
})


app.get('/weather', (req, res) =>
{
    if (!req.query.address)
    {
        return res.send(
        {
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>
    {
        if (error)
        {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) =>
        {
            if (error)
            {
                return res.send({ error })
            }

            res.send(
            {
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    /*res.send(
    {
        location: 'Mackay, QLD',
        temperature: 19,
        rain: 'None',
        address: req.query.address
    })*/
})


app.get('/products', (req, res) =>
{
    if (!req.query.search)
    {
        return res.send(
        {
            error: 'You must provide a search term'
        })
    }


    console.log(req.query.search)
    res.send(
    {
        products: []
    })
})


app.get('/help/*', (req, res) =>
{
    res.render('404',
    {
        title: '404 Help not found',
        name: 'Rory',
        errorMessage: 'Help page not found'
    })
})


app.get('*', (req, res) =>
{
    res.render('404',
    {
        title: '404',
        name: 'Rory',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () =>
{
    console.log('Server is up on port 3000')
})