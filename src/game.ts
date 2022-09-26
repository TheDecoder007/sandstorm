/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { hud } from 'dcl-builder-hud'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as utils from '@dcl/ecs-scene-utils'
export { groundParent, secondParent } 
export { hideGround, hideSecond, showGround, showSecond }
import { thirdParent } from 'src/third'
import { fourthParent } from "src/fourth"
import { secondParent, showSecond, hideSecond } from 'src/second'



const groundParent = new Entity('groundParent')
engine.addEntity(groundParent)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundParent.addComponentOrReplace(transform)


const Tower = new Entity('Tower')
engine.addEntity(Tower)
Tower.setParent(groundParent)
const transform1 = new Transform({
  position: new Vector3(10, -3.3, 21),
  rotation: new Quaternion(0, 180, 0),
  scale: new Vector3(1, 0.6, 1)
})
Tower.addComponentOrReplace(transform1)
const gltfshape1 = new GLTFShape("models/SandstormHQ_Tower.glb")
gltfshape1.withCollisions = true
gltfshape1.isPointerBlocker = true
gltfshape1.visible = true
Tower.addComponentOrReplace(gltfshape1)
hud.attachToEntity(Tower)


const Ship = new Entity('Ship')
engine.addEntity(Ship)
Ship.setParent(groundParent)
const transform2 = new Transform({
  position: new Vector3(16, -19, 14),
  rotation: Quaternion.Euler(0, 86, 0),
  scale: new Vector3(0.6, 0.6, 0.6)
})
Ship.addComponentOrReplace(transform2)
const gltfshape2 = new GLTFShape("models/SandstormHQ_Ship.glb")
gltfshape2.withCollisions = true
gltfshape2.isPointerBlocker = true
gltfshape2.visible = true
Ship.addComponentOrReplace(gltfshape2)
hud.attachToEntity(Ship)

const Ship2 = new Entity('Ship2')
engine.addEntity(Ship2)
Ship2.setParent(groundParent)
const transform3 = new Transform({
  position: new Vector3(1, -27, 28),
  rotation: Quaternion.Euler(0, 176, 0),
  scale: new Vector3(1, 1, 1)
})
Ship2.addComponentOrReplace(transform3)
const gltfshape3 = new GLTFShape("models/SandstormHQ_Ship.glb")
gltfshape3.withCollisions = true
gltfshape3.isPointerBlocker = true
gltfshape3.visible = true
Ship2.addComponentOrReplace(gltfshape3)
hud.attachToEntity(Ship2)


  // HIDE AVATAR AREAS 
  let hideGround = new Entity('hideGround')
  // hideGround.addComponent(new BoxShape()).withCollisions = false
  hideGround.addComponent(new Transform({
    position: new Vector3(16,0,24), scale: new Vector3(32,8,48)
  }))
  hideGround.addComponent(new AvatarModifierArea({area: { box: new Vector3 (32,8,48)}, modifiers:[AvatarModifiers.HIDE_AVATARS]}))
//engine.addEntity(hideGround)
hud.attachToEntity(hideGround)
  
  function showGround(){
    groundParent.getComponent(Transform).scale.setAll(1)
    engine.removeEntity(hideGround)
  
    secondParent.getComponent(Transform).scale.setAll(0)
    thirdParent.getComponent(Transform).scale.setAll(0)
    fourthParent.getComponent(Transform).scale.setAll(0)

    // engine.addEntity(hideSecond)
    movePlayerTo({x: 16, y:1, z: 3})
  }

let secondTrigger = new Entity('secondTrigger')
// houseTrigger.addComponent(new BoxShape())
secondTrigger.addComponent(new Transform( {position: new Vector3(10.3,0,4), rotation: Quaternion.Euler(0,0,0), scale: new Vector3(1,1,1)}))
secondTrigger.setParent(groundParent)
secondTrigger.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(2,3,1), new Vector3(-2.3,1.5,0)), {
    enableDebug: true,
         onCameraEnter: ()=>{

             showSecond()
}}))
hud.attachToEntity(secondTrigger)
