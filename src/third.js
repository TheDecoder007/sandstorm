/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as utils from "@dcl/ecs-scene-utils";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { hud } from "dcl-builder-hud";
export { thirdParent, thirdFloor, hideThird, showThird };
import { hideGround, hideSecond } from "src/game";
import { secondParent, groundParent } from "src/game";
import {
  fourthParent,
  fourthTrigger,
  showFourth,
  hideFourth,
} from "src/fourth";

let thirdParent = new Entity("third floor parent");
thirdParent.addComponent(
  new Transform({
    position: new Vector3(16, 16, 24),
    scale: new Vector3(0, 0, 0),
  })
);
engine.addEntity(thirdParent);
hud.attachToEntity(thirdParent);

let thirdFloor = new Entity("third floor");
thirdFloor.addComponent(new PlaneShape());
thirdFloor.setParent(thirdParent);
engine.addEntity(thirdFloor);
thirdFloor.addComponent(new Material()).albedoColor = Color4.Red();
thirdFloor.addComponent(
  new Transform({
    rotation: Quaternion.Euler(90, 0, 0),
    scale: new Vector3(30, 40, 1),
  })
);
hud.attachToEntity(thirdFloor);

let hideThird = new Entity("hideThird");
// hideThird.addComponent(new BoxShape()).withCollisions = false;
hideThird.addComponent(
  new Transform({
    position: new Vector3(16, 16, 24),
    scale: new Vector3(32, 8, 48),
  })
);
hideThird.addComponent(
  new AvatarModifierArea({
    area: { box: new Vector3(32, 8, 48) },
    modifiers: [AvatarModifiers.HIDE_AVATARS],
  })
),
  // {enableDebug:true}
  engine.addEntity(hideThird);
hud.attachToEntity(hideThird);

function showThird() {
  thirdParent.getComponent(Transform).scale.setAll(1);

  engine.addEntity(hideGround);
  engine.addEntity(hideSecond);
  engine.addEntity(hideFourth);

  engine.removeEntity(hideThird);

  fourthParent.getComponent(Transform).scale.setAll(0);
  secondParent.getComponent(Transform).scale.setAll(0);
  groundParent.getComponent(Transform).scale.setAll(0);
  // engine.addEntity(hideInside)
  movePlayerTo({ x: 8, y: 16.5, z: 8 });
}

let fourthTrigger = new Entity("fourthTrigger");
// fourthTrigger.addComponent(new BoxShape()).withCollisions = false
fourthTrigger.addComponent(
  new Transform({
    position: new Vector3(2.3, 0.8, 11.8),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(1, 1, 1),
  })
);
fourthTrigger.setParent(thirdParent);
fourthTrigger.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerBoxShape(new Vector3(2, 6, 2), new Vector3(-2.3, 1.5, 0)),
    {
      enableDebug: true,
      onCameraEnter: () => {
        showFourth();
      },
    }
  )
);
hud.attachToEntity(fourthTrigger);
