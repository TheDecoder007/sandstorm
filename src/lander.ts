/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { hud } from 'dcl-builder-hud'
import { groundParent } from './game'
// import * as utils from '@dcl/ecs-scene-utils'
export {landerShip} 


const landerShip = new Entity("LanderShip")
landerShip.addComponent(new GLTFShape('models/glowingSpaceship.glb'))
landerShip.addComponent(new Transform({position: new Vector3(16, 22, 27)}))
landerShip.getComponent(Transform).scale.setAll(3)
landerShip.setParent(groundParent)
hud.attachToEntity(landerShip) 


//Path

const point1 = new Vector3(16, 22, 27)
const point2 = new Vector3(16, 17, 21)
const point3 = new Vector3(16, 17, 21)
const point4 = new Vector3(16, 24, 26)
const point5 = new Vector3(16, 150, -20)
const point6 = new Vector3(16, 150, 27)


const myPath = new Path3D([point1, point2, point3, point4, point5, point6])

@Component("pathData")
export class PathData {
  origin: Vector3 = myPath.path[0]
  target: Vector3 = myPath.path[1]
  fraction: number = 0
  nextPathIndex: number = 1
}
 
export class PatrolPath implements ISystem {
  update(dt: number) {
    let transform = landerShip.getComponent(Transform)
    let path = landerShip.getComponent(PathData)
    if (path.fraction < 1) {
      transform.position = Vector3.Lerp(path.origin, path.target, path.fraction)
      path.fraction += dt / 6
    } else {
      path.nextPathIndex += 1
      if (path.nextPathIndex >= myPath.path.length) {
        path.nextPathIndex = 0
      }
      path.origin = path.target
      path.target = myPath.path[path.nextPathIndex]
      path.fraction = 0
    }
  }
}

engine.addSystem(new PatrolPath())

landerShip.addComponent(new PathData())

engine.addEntity(landerShip)