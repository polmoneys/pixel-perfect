import PxP from './lib'
import { slotsPortrait, slotsLandscape } from './items'
import { Fragment } from 'react'

function App() {
  return (
    <Fragment>
      <h1>
        Pixel <br aria-hidden="true" />
        Perfect
      </h1>

      <main>
        <PxP
          items={{
            portrait: slotsPortrait,
            landscape: slotsLandscape,
          }}
          grid={{
            rows: 6,
            cols: 6,
            minY: '10vh',
          }}
        />
      </main>
      <p>
        Make viewport <b>less wide</b> for changes
      </p>
    </Fragment>
  )
}

export default App
