import { useState, useEffect, useContext  } from 'react'
import { Grommet, Heading, Button, Header, Main, Grid, Text, Box, Card, CardBody, CardHeader, ResponsiveContext, CheckBoxGroup } from 'grommet';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
    />
  );

function App() {
  const size = useContext(ResponsiveContext)
  const [covidKeys, setCovidKeys] = useState(null)
  const [covidValues, setCovidValues] = useState(null)
  const [value, setValue] = useState([{ lab: `option 1`, val: 1,
  }])
  const [checkOptions, setCheckOptions] = useState([])

  const [sidebar, setSidebar] = useState(true);

  useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then(res => res.json())
        .then(
          (result) => {
            var checkoptions = []
            var keys = Object.keys(result)
            var values = Object.values(result)
            setCovidKeys(keys)
            setCovidValues(values)
            for (let i = 1; i <= keys.length; i++) {
              checkoptions.push({
                lab: keys[i],
                val: i,
              })
            }
            setCheckOptions(checkoptions)
          },
          (error) => {
            console.log(error)
          }
        )
    },[]);

    const cards = Array(20)
    .fill()
    .map((_, i) => <Text key={i}>{`Card ${i}`}</Text>);

  return (
    <Grommet>
      <AppBar>COVID Info!</AppBar>
      <ResponsiveContext.Consumer>
      {size => (
        <Box fill background="brand">
          <Heading>{`Hi, I'm ${size}, resize me!`}</Heading>
        </Box>
      )}
    </ResponsiveContext.Consumer>
    <Box direction="row">
        <Box>1</Box>
        <Box><Grid columns={'auto'} gap="small">
          {cards.map((card, index) => (
            
            <Card pad="large" key={index}>
              {card}
            </Card>
          ))}
        </Grid></Box>
    </Box>
  </Grommet>
  );
}

function FunCards (props) {
  console.log(props)
  return (
    <Card pad="small" gap="medium">
      <CardHeader background="dark-1">Head</CardHeader>
      <CardBody>body</CardBody>
    </Card>
  )
}

export default App;

/*

<Grid columns={size !== 'small' ? 'small' : '100%'} gap="small">
            {value.map((card, index) => (
                <FunCards set={card} ind={index}/>
              ))}
          </Grid>

          */

          /*
          <Grid
        fill
        rows={['auto','flex']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'sidebar', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}
      >
        <Box pad="medium" gridArea="sidebar" justify="center" align="center">
          <CheckBoxGroup
              labelKey="lab"
              valueKey="val"
              value={value}
              onChange={event => {
                setValue(event.value);
                console.log('Group1: ', event.value);
              }}
              options={checkOptions}
            />
        </Box>
        <Box gridArea="main" justify="center" align="center">
        <Grid columns={size !== 'small' ? 'small' : '100%'} gap="small">
          {cards.map((card, index) => (
            
            <Card pad="large" key={index}>
              {card}
            </Card>
          ))}
        </Grid>
        </Box>
      </Grid>*/