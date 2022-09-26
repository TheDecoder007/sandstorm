/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import * as utils from "@dcl/ecs-scene-utils";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { hud } from "dcl-builder-hud";
export { fourthParent, fourthFloor, showFourth, hideFourth };
import { hideGround, hideSecond, showGround } from "src/game";
import { secondParent, groundParent } from "src/game";
import { thirdParent, hideThird } from "src/third";

let fourthParent = new Entity("third floor parent");
fourthParent.addComponent(
  new Transform({
    position: new Vector3(16, 24, 24),
    scale: new Vector3(0, 0, 0),
  })
);
engine.addEntity(fourthParent);
hud.attachToEntity(fourthParent);

let fourthFloor = new Entity("fourth floor");
fourthFloor.addComponent(new PlaneShape());
fourthFloor.setParent(fourthParent);
engine.addEntity(fourthFloor);
fourthFloor.addComponent(new Material()).albedoColor = Color4.Red();
fourthFloor.addComponent(
  new Transform({
    rotation: Quaternion.Euler(90, 0, 0),
    scale: new Vector3(30, 40, 1),
  })
);
hud.attachToEntity(fourthFloor);

let hideFourth = new Entity("hideFourth");
hideFourth.addComponent(new BoxShape()).withCollisions = false;
hideFourth.addComponent(
  new Transform({
    position: new Vector3(16, 24, 24),
    scale: new Vector3(32, 8, 48),
  })
);
hideFourth.addComponent(
  new AvatarModifierArea({
    area: { box: new Vector3(32, 8, 48) },
    modifiers: [AvatarModifiers.HIDE_AVATARS],
  })
),
  // {enableDebug:true}
  engine.addEntity(hideFourth);
hud.attachToEntity(hideFourth);

function showFourth() {
  fourthParent.getComponent(Transform).scale.setAll(1);

  engine.addEntity(hideGround);
  engine.addEntity(hideSecond);
  engine.addEntity(hideThird);

  engine.removeEntity(hideFourth);

  thirdParent.getComponent(Transform).scale.setAll(0);
  secondParent.getComponent(Transform).scale.setAll(0);
  groundParent.getComponent(Transform).scale.setAll(0);
  // engine.addEntity(hideInside)
  movePlayerTo({ x: 8, y: 24.5, z: 8 });
}

let groundTrigger = new Entity("groundTrigger");
// groundTrigger.addComponent(new BoxShape()).withCollisions = false
groundTrigger.addComponent(
  new Transform({
    position: new Vector3(2.3, 0.8, 11.8),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(1, 1, 1),
  })
);
groundTrigger.setParent(fourthParent);
groundTrigger.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerBoxShape(new Vector3(2, 6, 2), new Vector3(-2.3, 1.5, 0)),
    {
      enableDebug: true,
      onCameraEnter: () => {
        showGround();
      },
    }
  )
);
hud.attachToEntity(groundTrigger);
