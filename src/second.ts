/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { hud } from 'dcl-builder-hud'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as utils from '@dcl/ecs-scene-utils'
import { hideThird, thirdParent, showThird } from 'src/third'
import { groundParent, hideGround } from './game'
import { hideFourth, fourthParent } from "src/fourth"
export { secondParent }
export { hideSecond, showSecond }


let secondParent = new Entity("second parent")
secondParent.addComponent(new Transform({
  position: new Vector3(16,8,24), scale: new Vector3(0,0,0)
}))
engine.addEntity(secondParent)
hud.attachToEntity(secondParent)

let secondFloor = new Entity('second floor')
secondFloor.addComponent(new PlaneShape())
secondFloor.setParent(secondParent)
engine.addEntity(secondFloor)
secondFloor.addComponent(new Material()).albedoColor = Color4.Red()
secondFloor.addComponent(new Transform({ rotation: Quaternion.Euler(90,0,0), scale: new Vector3(32,40,1) }))
hud.attachToEntity(secondFloor)


let hideSecond = new Entity('hideSecond')
// hideSecond.addComponent(new BoxShape()).withCollisions = false
hideSecond.addComponent(new Transform({
  position: new Vector3(16,8,24), scale: new Vector3(32,8,48)
}))
hideSecond.addComponent(new AvatarModifierArea({area: { box: new Vector3 (32,8,48) }, modifiers:[AvatarModifiers.HIDE_AVATARS]})),
// {enableDebug:true}
engine.addEntity(hideSecond) 
hud.attachToEntity(hideSecond)

function showSecond() {
    groundParent.getComponent(Transform).scale.setAll(0)
    thirdParent.getComponent(Transform).scale.setAll(0)
    fourthParent.getComponent(Transform).scale.setAll(0)


    engine.addEntity(hideGround)
    engine.addEntity(hideThird)
    engine.addEntity(hideFourth)

    engine.removeEntity(hideSecond)
  
    secondParent.getComponent(Transform).scale.setAll(1)
    movePlayerTo({x: 16, y:10.3, z:8})
  }

  let thirdTrigger = new Entity('thirdTrigger')
// thirdTrigger.addComponent(new BoxShape())
thirdTrigger.addComponent(new Transform( {position: new Vector3(2.3,0.75,8.3), rotation: Quaternion.Euler(0,0,0), scale: new Vector3(1,1,1)}))
thirdTrigger.setParent(secondParent)
thirdTrigger.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(2,2,3), new Vector3(-2.3,1.5,0)), {
  enableDebug: true,
  onCameraEnter:()=>{

        showThird()
      
  }}))
hud.attachToEntity(thirdTrigger)