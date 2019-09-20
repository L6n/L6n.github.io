"use strict";

var CABLES=CABLES||{};
CABLES.OPS=CABLES.OPS||{};

var Ops=Ops || {};
Ops.Gl=Ops.Gl || {};
Ops.Math=Ops.Math || {};
Ops.Anim=Ops.Anim || {};
Ops.User=Ops.User || {};
Ops.Value=Ops.Value || {};
Ops.Array=Ops.Array || {};
Ops.String=Ops.String || {};
Ops.Boolean=Ops.Boolean || {};
Ops.Sidebar=Ops.Sidebar || {};
Ops.User.l6n=Ops.User.l6n || {};
Ops.WebAudio=Ops.WebAudio || {};
Ops.Gl.Meshes=Ops.Gl.Meshes || {};
Ops.Gl.Shader=Ops.Gl.Shader || {};
Ops.Gl.Matrix=Ops.Gl.Matrix || {};
Ops.Deprecated=Ops.Deprecated || {};
Ops.Deprecated.Array=Ops.Deprecated.Array || {};

Ops.Gl.Meshes.PointCloudFromArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

const
    exe=op.inTrigger("exe"),
    arr=op.inArray("Array"),
    numPoints=op.inValueInt("Num Points"),
    outTrigger = op.outTrigger("Trigger out"),
    outGeom=op.outObject("Geometry"),
    pTexCoordRand=op.inValueBool("Scramble Texcoords",true),
    seed=op.inValue("Seed"),
    vertCols=op.inArray("Vertex Colors");


const cgl=op.patch.cgl;

pTexCoordRand.onChange=updateRandTexCoords;
seed.onChange=arr.onChange=reset;
numPoints.onChange=updateNumVerts;

op.toWorkPortsNeedToBeLinked(arr,exe);

var hasError=false;
var showingError=false;

exe.onTriggered=doRender;

var mesh=null;
const geom=new CGL.Geometry("pointcloudfromarray");
var texCoords=[];
var needsRebuild=true;

function doRender()
{
    outTrigger.trigger();
    if(CABLES.UI)
    {
        var shader=cgl.getShader();
        if(shader && shader.glPrimitive!=cgl.gl.POINTS)
        {
            if(!hasError)
            {
                op.uiAttr( { 'warning': 'using a Material not made for point rendering. maybe use pointMaterial.' } );
                hasError=true;
            }
            return;
        }
        if(hasError)
        {
            op.uiAttr({'warning':null});
            hasError=false;
        }
    }

    if(needsRebuild || !mesh)rebuild();
    if(mesh) mesh.render(cgl.getShader());
}

function reset()
{
    needsRebuild=true;
}

function updateRandTexCoords()
{
    if(!pTexCoordRand.get()) seed.setUiAttribs({hidePort:true,greyout:true});
        else seed.setUiAttribs({hidePort:false,greyout:false});
    needsRebuild=true;
}

function updateNumVerts()
{
    if(mesh)
    {
        mesh.setNumVertices( Math.min(geom.vertices.length/3,numPoints.get()));
        if(numPoints.get()==0)mesh.setNumVertices(geom.vertices.length/3);
    }
}

function rebuild()
{
    var verts=arr.get();

    if(!verts || verts.length==0)
    {
        mesh=null;
        return;
    }

    if(showingError)
    {
        showingError = false;
        op.uiAttr({error:null});
    }

    var divisibleBy3 = verts.length % 3 === 0;

    if(divisibleBy3 === false)
    {
        if(!showingError)
        {
            op.uiAttr({error:"Array length not divisible by 3!"});
            showingError = true;
        }
        return;
    }

    geom.clear();
    var num=verts.length/3;
    num=Math.abs(Math.floor(num));

    if(!texCoords || texCoords.length!=num*2) texCoords.length=num*2;//=new Float32Array(num*2);

    var changed=false;
    var rndTc=pTexCoordRand.get();

    Math.randomSeed=seed.get();

    for(var i=0;i<num;i++)
    {
        if(geom.vertices[i*3]!=verts[i*3] ||
            geom.vertices[i*3+1]!=verts[i*3+1] ||
            geom.vertices[i*3+2]!=verts[i*3+2])
        {
            if(rndTc)
            {
                texCoords[i*2]=Math.seededRandom();
                texCoords[i*2+1]=Math.seededRandom();
            }
            else
            {
                texCoords[i*2]=i/num;
                texCoords[i*2+1]=i/num;
            }
            changed=true;
        }
    }

    if(vertCols.get())
    {
        if(!showingError && vertCols.get().length!=num*4)
        {
            op.uiAttr({error:"Color array does not have the correct length! (should be "+num*4+")"});
            showingError = true;
            mesh=null;
            return;
        }

        geom.vertexColors=vertCols.get();
    }
    else geom.vertexColors=[];

    if(changed)
    {
        geom.setPointVertices(verts);
        geom.setTexCoords(texCoords);
        geom.verticesIndices=[];

        if(mesh)mesh.dispose();
        mesh=new CGL.Mesh(cgl,geom,cgl.gl.POINTS);

        mesh.addVertexNumbers=true;
        mesh.setGeom(geom);
        outGeom.set(geom);
    }

    updateNumVerts();
    needsRebuild=false;
}

};

Ops.Gl.Meshes.PointCloudFromArray.prototype = new CABLES.Op();
CABLES.OPS["0a6d9c6f-6459-45ca-88ad-268a1f7304db"]={f:Ops.Gl.Meshes.PointCloudFromArray,objName:"Ops.Gl.Meshes.PointCloudFromArray"};




// **************************************************************
// 
// Ops.Array.ArrayPack3
// 
// **************************************************************

Ops.Array.ArrayPack3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const exe = op.inTrigger("Trigger in"),
    inArr1=op.inArray("Array 1"),
    inArr2=op.inArray("Array 2"),
    inArr3=op.inArray("Array 3"),
    exeOut = op.outTrigger("Trigger out"),
    outArr=op.outArray("Array out"),
    outNum=op.outValue("Num Points"),
    outArrayLength = op.outNumber("Array length");

var showingError = false;

var arr=[];
var emptyArray=[];

exe.onTriggered = update;


function update()
{
    var array1=inArr1.get();
    var array2=inArr2.get();
    var array3=inArr3.get();

    if(!array1 && !array2 && !array3 )
    {
        outArr.set(null);
        outNum.set(0);
        return;
    }

    var arrlen=0;

    if(!array1 || !array2 || !array3)
    {
        if(array1) arrlen=array1.length;
            else if(array2) arrlen=array2.length;
            else if(array3) arrlen=array3.length;

        if(emptyArray.length!=arrlen)
            for(var i=0;i<arrlen;i++) emptyArray[i]=0;

        if(!array1)array1=emptyArray;
        if(!array2)array2=emptyArray;
        if(!array3)array3=emptyArray;
    }

    if((array1.length !== array2.length) || (array2.length !== array3.length))
    {
        if(!showingError)
        {
            op.uiAttr({error:"Arrays do not have the same length !"});
            outNum.set(0);
            showingError = true;
        }
        return;
    }

    if(showingError)
    {
        showingError = false;
        op.uiAttr({error:null});
    }

    arr.length = array1.length;
    for(var i=0;i<array1.length;i++)
    {
        arr[i*3+0] = array1[i];
        arr[i*3+1] = array2[i];
        arr[i*3+2] = array3[i];

    }

    outArr.set(null);
    outArr.set(arr);
    outNum.set(arr.length/3);
    outArrayLength.set(arr.length);

    exeOut.trigger();
}



};

Ops.Array.ArrayPack3.prototype = new CABLES.Op();
CABLES.OPS["2bcf32fe-3cbd-48fd-825a-61255bebda9b"]={f:Ops.Array.ArrayPack3,objName:"Ops.Array.ArrayPack3"};

Ops.Anim.Smooth = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const exec=op.inTrigger("Update");
const inMode = op.inBool("Separate inc/dec",false);
const inVal=op.inValue("Value");
const next=op.outTrigger("Next");
const inDivisorUp=op.inValue("Inc factor",4);
const inDivisorDown=op.inValue("Dec factor",4);
const result=op.outValue("Result",0);

var val=0;
var goal=0;
var oldVal=0;
var lastTrigger=0;
op.toWorkPortsNeedToBeLinked(exec);

var divisorUp;
var divisorDown;
var divisor = 4;

var selectIndex = 0;
const MODE_SINGLE = 0;
const MODE_UP_DOWN = 1;

onFilterChange();
getDivisors();

inMode.setUiAttribs({hidePort:true});

inDivisorUp.onChange = inDivisorDown.onChange = getDivisors;
inMode.onChange = onFilterChange;
update();

function onFilterChange()
{
    var selectedMode = inMode.get();
    if(selectedMode === false) selectIndex = MODE_SINGLE;
    else if(selectedMode === true) selectIndex = MODE_UP_DOWN;


    if(selectIndex == MODE_SINGLE)
    {
        inDivisorDown.setUiAttribs({greyout:true});
        inDivisorUp.setUiAttribs({title:"Inc/Dec factor"});

    }
    else if (selectIndex == MODE_UP_DOWN)
    {
        inDivisorDown.setUiAttribs({greyout:false});
        inDivisorUp.setUiAttribs({title:"Inc factor"});
    }

    getDivisors();
    update();
};

function getDivisors()
{
    if(selectIndex == MODE_SINGLE)
    {
        divisorUp=inDivisorUp.get();
        divisorDown=inDivisorUp.get();
    }
    else if (selectIndex == MODE_UP_DOWN)
    {
        divisorUp=inDivisorUp.get();
        divisorDown=inDivisorDown.get();
    }

    if(divisorUp<=0.2 || divisorUp != divisorUp )divisorUp=0.2;
    if(divisorDown<=0.2 || divisorDown != divisorDown )divisorDown=0.2;
};

inVal.onChange=function()
{
    goal=inVal.get();
};

inDivisorUp.onChange=function()
{
    getDivisors();
};

function update()
{
    var tm=1;
    if(CABLES.now()-lastTrigger>500 || lastTrigger===0)val=inVal.get();
    else tm=(CABLES.now()-lastTrigger)/16;
    lastTrigger=CABLES.now();

    if(divisor<=0)divisor=0.0001;

    var diff = goal-val;

    if(diff  >= 0)
        val=val+(diff)/(divisorDown*tm);
    else
        val=val+(diff)/(divisorUp*tm);
    //val=val+(goal-val)/(divisor*tm);

    if(val>0 && val<0.000000001)val=0;
    if(divisor!=divisor)val=0;
    if(val!=val|| val== -Infinity || val==Infinity)val=inVal.get();

    if(oldVal!=val)
    {
        result.set(val);
        oldVal=val;
    }

    next.trigger();
};

exec.onTriggered = function()
{
    update();
};






};

Ops.Anim.Smooth.prototype = new CABLES.Op();
CABLES.OPS["5677b5b5-753a-4fbf-9e91-64c81ec68a2f"]={f:Ops.Anim.Smooth,objName:"Ops.Anim.Smooth"};

Ops.Array.ArraySin = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
//this op allows the user to perform sin or cos
//math functions on an array
const inArray = op.inArray("array in");
const mathSelect = op.inValueSelect("Math function",["Sin","Cos"],"Sin");
const outArray = op.outArray("Array result");

const phase=op.inValue("Phase",0.0);
const multiply=op.inValue("Frequency",1.0);
const amplitude=op.inValue("Amplitude",1.0);

var mathArray = [];
var selectIndex = 0;

const MATH_FUNC_SIN = 0;
const MATH_FUNC_COS = 1;


inArray.onChange = update;
multiply.onChange = update;
amplitude.onChange = update;
phase.onChange = update;
mathSelect.onChange = onFilterChange;

function onFilterChange()
{
    var mathSelectValue = mathSelect.get();
    if(mathSelectValue === "Sin") selectIndex = MATH_FUNC_SIN;
    else if(mathSelectValue === "Cos") selectIndex = MATH_FUNC_COS;
    update();
}

function update()
{
    var arrayIn = inArray.get();


    if(!arrayIn)
    {
        mathArray.length = 0;
        return;
    }

    mathArray.length = arrayIn.length;

    var amp = amplitude.get();
    var mul = multiply.get();
    var pha = phase.get();

    var i = 0;
    if(selectIndex === MATH_FUNC_SIN)
    {
        for(i = 0; i < arrayIn.length; i++)
            mathArray[i] = amp * Math.sin((arrayIn[i]) *  mul + pha);
    }
    else if(selectIndex === MATH_FUNC_COS)
    {
        for(i = 0; i < arrayIn.length; i++)
            mathArray[i] = amp * (Math.cos(arrayIn[i] * mul + pha));
    }
    outArray.set(null);
    outArray.set(mathArray);
}


};

Ops.Array.ArraySin.prototype = new CABLES.Op();
CABLES.OPS["ded44bae-a24e-48c5-9585-4cb31f331ab6"]={f:Ops.Array.ArraySin,objName:"Ops.Array.ArraySin"};

Ops.Array.ArrayMathArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
//this op expects 2 arrays. The user can then pick a
//mathematical function which will be applied to the
//two arrays. If arrays have a different length then a warning
//is given in the panel
const inArray_0 = op.inArray("array 0"),
    inArray_1 = op.inArray("array 1"),
    mathSelect = op.inSwitch("Math function",['+','-','*','/','%','min','max'],'+'),
    outArray = op.outArray("Array result"),
    outArrayLength = op.outNumber("Array length");

//cache for errors
var showingError = false;
//create array to store multiplied result from both arrays
var mathArray = [];
var selectIndex = 0;

op.toWorkPortsNeedToBeLinked(inArray_1,inArray_0);

const MATH_FUNC_ADD = 0;
const MATH_FUNC_SUB = 1;
const MATH_FUNC_MUL = 2;
const MATH_FUNC_DIV = 3;
const MATH_FUNC_MOD = 4;
const MATH_FUNC_MIN = 5;
const MATH_FUNC_MAX = 6;

mathSelect.onChange = onFilterChange;

function onFilterChange()
{
    var mathSelectValue = mathSelect.get();
    if(mathSelectValue === '+') selectIndex = MATH_FUNC_ADD;
    else if(mathSelectValue === '-') selectIndex = MATH_FUNC_SUB;
    else if(mathSelectValue === '*') selectIndex = MATH_FUNC_MUL;
    else if(mathSelectValue === '/') selectIndex = MATH_FUNC_DIV;
    else if(mathSelectValue === '%') selectIndex = MATH_FUNC_MOD;
    else if(mathSelectValue === 'min') selectIndex = MATH_FUNC_MIN;
    else if(mathSelectValue === 'max') selectIndex = MATH_FUNC_MAX;
    update();
    op.setUiAttrib({"extendTitle":mathSelectValue});
}

function update()
{
    var array0 = inArray_0.get();
    var array1 = inArray_1.get();
    //reset array
    mathArray.length = 0;

    //check if arrays come in correctly on startup
    if(!array0 || !array1)
    {
        outArrayLength.set(0);
        return;
    }

    // console.log(array0.length, array1.length);

    //if arrays don't have the same length then give a warning to panel ui
    if(array0.length !== array1.length)
    {
        if(!showingError)
        {
            op.uiAttr({error:"Arrays do not have the same length !"});
            showingError = true;
        }
        return;
    }
    if(showingError)
    {
        showingError = false;
        op.uiAttr({error:null});
    }


    mathArray.length = array0.length;

    //create variable for for loop
    var i = 0;
    //use selectIndex to decide which math mode is used on the 2 arrays
    if(selectIndex === MATH_FUNC_ADD)
    {
        for(i = 0; i < array0.length; i++)
            mathArray[i] = array0[i] + array1[i];
    }
    else if(selectIndex === MATH_FUNC_SUB)
    {
        for(i = 0; i < array0.length; i++)
            mathArray[i] = array0[i] - array1[i];
    }
    else if(selectIndex === MATH_FUNC_MUL)
    {
        for(i = 0; i < array0.length; i++)
            mathArray[i] = array0[i] * array1[i];
    }
    else if(selectIndex === MATH_FUNC_DIV)
    {
        for(i = 0; i < array0.length; i++)
            mathArray[i] = array0[i] / array1[i];
    }
    else if(selectIndex === MATH_FUNC_MOD)
    {
        for(i = 0; i < array0.length; i++)
            mathArray[i] = array0[i] % array1[i];
    }
    else if(selectIndex === MATH_FUNC_MIN)
    {
        for(i = 0; i < array0.length; i++)
            mathArray[i] = Math.min(array0[i], array1[i]);
    }
    else if(selectIndex === MATH_FUNC_MAX)
    {
        for(i = 0; i < array0.length; i++)
            mathArray[i] = Math.max(array0[i], array1[i]);
    }
    outArray.set(null);
    outArrayLength.set(mathArray.length);
    outArray.set(mathArray);
}

inArray_0.onChange = update;
inArray_1.onChange = update;

update();

};

Ops.Array.ArrayMathArray.prototype = new CABLES.Op();
CABLES.OPS["f31a1764-ce14-41de-9b3f-dc2fe249bb52"]={f:Ops.Array.ArrayMathArray,objName:"Ops.Array.ArrayMathArray"};




// **************************************************************
// 
// Ops.Gl.Shader.PointMaterial
// 
// **************************************************************

Ops.Gl.Shader.PointMaterial = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={shader_frag:"\n{{MODULES_HEAD}}\n\nIN vec2 texCoord;\n#ifdef HAS_TEXTURES\n\n   #ifdef HAS_TEXTURE_DIFFUSE\n       UNI sampler2D diffTex;\n   #endif\n   #ifdef HAS_TEXTURE_MASK\n       UNI sampler2D texMask;\n   #endif\n#endif\nUNI float r;\nUNI float g;\nUNI float b;\nUNI float a;\n\n#ifdef VERTEX_COLORS\n    IN vec3 vertexColor;\n#endif\n\nvoid main()\n{\n    {{MODULE_BEGIN_FRAG}}\n\n    vec4 col=vec4(r,g,b,a);\n\n    #ifdef HAS_TEXTURES\n\n        #ifdef HAS_TEXTURE_MASK\n            float mask=texture(texMask,vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y))).r;\n        #endif\n\n        #ifdef HAS_TEXTURE_DIFFUSE\n\n            #ifdef LOOKUP_TEXTURE\n                col=texture(diffTex,texCoord);\n            #endif\n            #ifndef LOOKUP_TEXTURE\n                col=texture(diffTex,vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y)));\n            #endif\n\n            #ifdef COLORIZE_TEXTURE\n              col.r*=r;\n              col.g*=g;\n              col.b*=b;\n            #endif\n        #endif\n        col.a*=a;\n    #endif\n\n    {{MODULE_COLOR}}\n\n    #ifdef MAKE_ROUND\n        if ((gl_PointCoord.x-0.5)*(gl_PointCoord.x-0.5) + (gl_PointCoord.y-0.5)*(gl_PointCoord.y-0.5) > 0.25) discard; //col.a=0.0;\n    #endif\n\n    #ifdef VERTEX_COLORS\n        col.rgb*=vertexColor;\n    #endif\n\n\n    #ifdef HAS_TEXTURE_MASK\n        col.a=mask;\n    #endif\n\n\n    // #ifdef RANDOMIZE_COLOR\n        // col.rgb*=fract(sin(dot(texCoord.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    // #endif\n\n\n\n    outColor = col;\n}\n",shader_vert:"{{MODULES_HEAD}}\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\n\n#ifdef VERTEX_COLORS\n    IN vec3 attrVertColor;\n    OUT vec3 vertexColor;\n#endif\n\nOUT vec3 norm;\n#ifdef HAS_TEXTURES\n    OUT vec2 texCoord;\n#endif\n\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\nUNI float pointSize;\nUNI vec3 camPos;\n\nUNI float canvasWidth;\nUNI float canvasHeight;\nUNI float camDistMul;\n\nUNI float randomSize;\n\nIN float attrVertIndex;\n\n\nfloat rand(float n){return fract(sin(n) * 43758.5453123);}\n\n#define POINTMATERIAL\n\nvoid main()\n{\n    float psMul=sqrt(canvasWidth/canvasHeight)+0.00000000001;\n    float sizeMultiply=1.0;\n\n    #ifdef VERTEX_COLORS\n        vertexColor=attrVertColor;\n    #endif\n\n    #ifdef HAS_TEXTURES\n        texCoord=attrTexCoord;\n    #endif\n\n    mat4 mMatrix=modelMatrix;\n\n    vec4 pos = vec4( vPosition, 1. );\n\n    {{MODULE_VERTEX_POSITION}}\n\n    vec4 model=mMatrix * pos;\n\n    psMul+=rand(attrVertIndex)*randomSize;\n\n    psMul*=sizeMultiply;\n\n    #ifndef SCALE_BY_DISTANCE\n        gl_PointSize = pointSize * psMul;\n    #endif\n    #ifdef SCALE_BY_DISTANCE\n        float cameraDist = distance(model.xyz, camPos);\n        gl_PointSize = (pointSize / cameraDist) * psMul;\n    #endif\n\n    gl_Position = projMatrix * viewMatrix * model;\n}\n",};
const cgl=op.patch.cgl;

const
    render=op.inTrigger("render"),
    pointSize=op.inValueFloat("PointSize",3),
    randomSize=op.inValue("Random Size",3),
    makeRound=op.inValueBool("Round",true),
    doScale=op.inValueBool("Scale by Distance",false),
    r = op.inValueSlider("r", Math.random()),
    g = op.inValueSlider("g", Math.random()),
    b = op.inValueSlider("b", Math.random()),
    a = op.inValueSlider("a",1),
    preMultipliedAlpha=op.inValueBool("preMultiplied alpha"),
    vertCols=op.inBool("Vertex Colors",false),
    texture=op.inTexture("texture"),
    textureMask=op.inTexture("Texture Mask"),
    colorizeTexture=op.inValueBool("colorizeTexture",false),
    textureLookup=op.inValueBool("texture Lookup",false),
    trigger=op.outTrigger('trigger'),
    shaderOut=op.outObject("shader");

op.setPortGroup("Texture",[textureLookup,textureMask,texture,colorizeTexture]);
op.setPortGroup("Color",[r,g,b,a,preMultipliedAlpha,vertCols]);
op.setPortGroup("Size",[pointSize,randomSize,makeRound,doScale]);
r.setUiAttribs({ colorPick: true });

const shader=new CGL.Shader(cgl,'PointMaterial');
shader.setModules(['MODULE_VERTEX_POSITION','MODULE_COLOR','MODULE_BEGIN_FRAG']);
shader.define('MAKE_ROUND');

const
    uniPointSize=new CGL.Uniform(shader,'f','pointSize',pointSize),
    uniRandomSize=new CGL.Uniform(shader,'f','randomSize',randomSize),
    runiform=new CGL.Uniform(shader,'f','r',r),
    guniform=new CGL.Uniform(shader,'f','g',g),
    buniform=new CGL.Uniform(shader,'f','b',b),
    auniform=new CGL.Uniform(shader,'f','a',a),
    uniWidth=new CGL.Uniform(shader,'f','canvasWidth',cgl.canvasWidth),
    uniHeight=new CGL.Uniform(shader,'f','canvasHeight',cgl.canvasHeight);

shaderOut.set(shader);
shader.setSource(attachments.shader_vert,attachments.shader_frag);
shader.glPrimitive=cgl.gl.POINTS;
shader.bindTextures=bindTextures;
shaderOut.ignoreValueSerialize=true;

render.onTriggered=doRender;

var textureUniform=null;
var textureMaskUniform=null;

op.preRender=function()
{
    if(shader)shader.bind();
    doRender();
};

function bindTextures()
{
    if(texture.get()) cgl.setTexture(0,texture.get().tex);
    if(textureMask.get()) cgl.setTexture(1,textureMask.get().tex);
}

function doRender()
{
    uniWidth.setValue(cgl.canvasWidth);
    uniHeight.setValue(cgl.canvasHeight);

    cgl.setShader(shader);
    bindTextures();
    if(preMultipliedAlpha.get())cgl.gl.blendFunc(cgl.gl.ONE, cgl.gl.ONE_MINUS_SRC_ALPHA);

    trigger.trigger();
    if(preMultipliedAlpha.get())cgl.gl.blendFunc(cgl.gl.SRC_ALPHA,cgl.gl.ONE_MINUS_SRC_ALPHA);

    cgl.setPreviousShader();
}

doScale.onChange=function()
{
    shader.toggleDefine('SCALE_BY_DISTANCE',doScale.get());
};

makeRound.onChange=function()
{
    shader.toggleDefine('MAKE_ROUND',makeRound.get());
};

colorizeTexture.onChange=function()
{
    shader.toggleDefine('COLORIZE_TEXTURE',colorizeTexture.get());
};

textureLookup.onChange=function()
{
    shader.toggleDefine('LOOKUP_TEXTURE',textureLookup.get());
};

vertCols.onChange=function()
{
    shader.toggleDefine('VERTEX_COLORS',vertCols.get());
};

texture.onChange=function()
{
    if(texture.get())
    {
        if(textureUniform!==null)return;
        shader.removeUniform('diffTex');
        shader.define('HAS_TEXTURE_DIFFUSE');
        textureUniform=new CGL.Uniform(shader,'t','diffTex',0);
    }
    else
    {
        shader.removeUniform('diffTex');
        shader.removeDefine('HAS_TEXTURE_DIFFUSE');
        textureUniform=null;
    }
};

textureMask.onChange=function()
{
    if(textureMask.get())
    {
        if(textureMaskUniform!==null)return;
        shader.removeUniform('texMask');
        shader.define('HAS_TEXTURE_MASK');
        textureMaskUniform=new CGL.Uniform(shader,'t','texMask',1);
    }
    else
    {
        shader.removeUniform('texMask');
        shader.removeDefine('HAS_TEXTURE_MASK');
        textureMaskUniform=null;
    }
};



};

Ops.Gl.Shader.PointMaterial.prototype = new CABLES.Op();
CABLES.OPS["f86a4a07-00ee-4f68-8839-e02d51d1cd2f"]={f:Ops.Gl.Shader.PointMaterial,objName:"Ops.Gl.Shader.PointMaterial"};

Ops.Array.ArrayMultiply = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var inArray=op.inArray("In");
var inValue=op.inValue("Value",1.0);
var outArray=op.outArray("Result");

var newArr=[];
outArray.set(newArr);
inArray.onChange=
inValue.onChange=inArray.onChange=function()
{
    var arr=inArray.get();
    if(!arr)return;

    var mul=inValue.get();

    if(newArr.length!=arr.length)newArr.length=arr.length;

    for(var i=0;i<arr.length;i++)
    {
        newArr[i]=arr[i]*mul;
    }
    outArray.set(null);
    outArray.set(newArr);
};

};

Ops.Array.ArrayMultiply.prototype = new CABLES.Op();
CABLES.OPS["a01c344b-4129-4b01-9c8f-36cefe86d7cc"]={f:Ops.Array.ArrayMultiply,objName:"Ops.Array.ArrayMultiply"};

Ops.Array.ArraySum = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var inArray=op.inArray("In");
var inValue=op.inValue("Value",1.0);
var outArray=op.outArray("Result");

var newArr=[];
outArray.set(newArr);

inValue.onChange=
inArray.onChange=function()
{
    var arr=inArray.get();
    if(!arr)return;

    var add=inValue.get();

    if(newArr.length!=arr.length)newArr.length=arr.length;

    for(var i=0;i<arr.length;i++)
    {
        newArr[i]=arr[i]+add;
    }

    outArray.set(null);
    outArray.set(newArr);
};


};

Ops.Array.ArraySum.prototype = new CABLES.Op();
CABLES.OPS["c6b5bf63-0be8-4eea-acc0-9d32973e665a"]={f:Ops.Array.ArraySum,objName:"Ops.Array.ArraySum"};

Ops.Array.ArrayModulo = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var inArray = op.inArray("Array In");
var inValue = op.inValue("Value",1.0);
var outArray = op.outArray("Array Out");

var newArr = [];
outArray.set(newArr);
inArray.onChange =
inValue.onChange = inArray.onChange = function()
{
    var arr = inArray.get();
    if(!arr)return;
    
    var modulo = inValue.get();
    
    if(newArr.length != arr.length)newArr.length = arr.length;
    
    var i = 0;
    for(i = 0;i < arr.length;i++)
    {
        newArr[i] = arr[i] % modulo;
    }
    outArray.set(null);
    outArray.set(newArr);
};

};

Ops.Array.ArrayModulo.prototype = new CABLES.Op();
CABLES.OPS["30a5568b-31da-4504-9525-578ee404993c"]={f:Ops.Array.ArrayModulo,objName:"Ops.Array.ArrayModulo"};

Ops.Array.ArraySubtract = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var inArray = op.inArray("Array In");
var inValue = op.inValue("Value",1.0);
var outArray = op.outArray("Array Out");

var newArr = [];
outArray.set(newArr);
inArray.onChange =
inValue.onChange = inArray.onChange = function()
{
    var arr = inArray.get();
    if(!arr)return;
    
    var subtract = inValue.get();
    
    if(newArr.length != arr.length)newArr.length = arr.length;
    
    var i = 0;
    for(i = 0;i < arr.length;i++)
    {
        newArr[i] = arr[i] - subtract;
    }
    outArray.set(null);
    outArray.set(newArr);
};

};

Ops.Array.ArraySubtract.prototype = new CABLES.Op();
CABLES.OPS["af78ab59-75d5-4ead-9a8d-27a63e1cbf3f"]={f:Ops.Array.ArraySubtract,objName:"Ops.Array.ArraySubtract"};

Ops.Value.Number = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const v=op.inValueFloat("value");
const result=op.outValue("result");

v.onChange=exec;

function exec()
{
    result.set(parseFloat(v.get()));
}

};

Ops.Value.Number.prototype = new CABLES.Op();
CABLES.OPS["8fb2bb5d-665a-4d0a-8079-12710ae453be"]={f:Ops.Value.Number,objName:"Ops.Value.Number"};

Ops.Math.Divide = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    number1 = op.inValueFloat("number1",1),
    number2 = op.inValueFloat("number2",1),
    result = op.outValue("result");

number1.onChange=number2.onChange=exec;
exec();

function exec()
{
    result.set( number1.get() / number2.get() );
}



};

Ops.Math.Divide.prototype = new CABLES.Op();
CABLES.OPS["86fcfd8c-038d-4b91-9820-a08114f6b7eb"]={f:Ops.Math.Divide,objName:"Ops.Math.Divide"};

Ops.Deprecated.Array.ContinuousNumberArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

var numValues=op.inValueInt("numValues");

var values=op.addOutPort(new CABLES.Port(op, "values",CABLES.OP_PORT_TYPE_ARRAY));
values.ignoreValueSerialize=true;

numValues.set(100);

numValues.onChange=init;

var arr=[];
init();

function init()
{
    arr.length=Math.abs(Math.floor(numValues.get())) || 100;
    for(var i=0;i<arr.length;i++)
    {
        arr[i]=i;
    }
    
    values.set(null);
    values.set(arr);
}


};

Ops.Deprecated.Array.ContinuousNumberArray.prototype = new CABLES.Op();
CABLES.OPS["8b9cdeea-f94c-41dc-b743-627115289226"]={f:Ops.Deprecated.Array.ContinuousNumberArray,objName:"Ops.Deprecated.Array.ContinuousNumberArray"};

Ops.Math.MapRange = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

const result=op.outValue("result");
var v=op.inValueFloat("value");
var old_min=op.inValueFloat("old min");
var old_max=op.inValueFloat("old max");
var new_min=op.inValueFloat("new min");
var new_max=op.inValueFloat("new max");
var easing=op.inValueSelect("Easing",["Linear","Smoothstep","Smootherstep"],"Linear");

op.setPortGroup("Input Range",[old_min,old_max]);
op.setPortGroup("Output Range",[new_min,new_max]);

var ease=0;
var r=0;

easing.onChange=function()
{
    if(easing.get()=="Smoothstep") ease=1;
        else if(easing.get()=="Smootherstep") ease=2;
            else ease=0;
};


function exec()
{
    if(v.get()>=Math.max( old_max.get(),old_min.get() ))
    {
        result.set(new_max.get());
        return;
    }
    else
    if(v.get()<=Math.min( old_max.get(),old_min.get() ))
    {
        result.set(new_min.get());
        return;
    }

    var nMin=new_min.get();
    var nMax=new_max.get();
    var oMin=old_min.get();
    var oMax=old_max.get();
    var x=v.get();

    var reverseInput = false;
    var oldMin = Math.min( oMin, oMax );
    var oldMax = Math.max( oMin, oMax );
    if(oldMin!= oMin) reverseInput = true;

    var reverseOutput = false;
    var newMin = Math.min( nMin, nMax );
    var newMax = Math.max( nMin, nMax );
    if(newMin != nMin) reverseOutput = true;

    var portion=0;

    if(reverseInput) portion = (oldMax-x)*(newMax-newMin)/(oldMax-oldMin);
        else portion = (x-oldMin)*(newMax-newMin)/(oldMax-oldMin);

    if(reverseOutput) r=newMax - portion;
        else r=portion + newMin;

    if(ease===0)
    {
        result.set(r);
    }
    else
    if(ease==1)
    {
        x = Math.max(0, Math.min(1, (r-nMin)/(nMax-nMin)));
        result.set( nMin+x*x*(3 - 2*x)* (nMax-nMin) ); // smoothstep
    }
    else
    if(ease==2)
    {
        x = Math.max(0, Math.min(1, (r-nMin)/(nMax-nMin)));
        result.set( nMin+x*x*x*(x*(x*6 - 15) + 10) * (nMax-nMin) ) ; // smootherstep
    }

}

v.set(0);
old_min.set(0);
old_max.set(1);
new_min.set(-1);
new_max.set(1);


v.onChange=exec;
old_min.onChange=exec;
old_max.onChange=exec;
new_min.onChange=exec;
new_max.onChange=exec;

result.set(0);

exec();

};

Ops.Math.MapRange.prototype = new CABLES.Op();
CABLES.OPS["2617b407-60a0-4ff6-b4a7-18136cfa7817"]={f:Ops.Math.MapRange,objName:"Ops.Math.MapRange"};

Ops.Gl.Matrix.Scale = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    render=op.inTrigger("render"),
    scale=op.inValueFloat("scale",1.0),
    trigger=op.outTrigger("trigger");

const cgl=op.patch.cgl;
const vScale=vec3.create();

scale.onChange=scaleChanged;
scaleChanged();

render.onTriggered=function()
{
    cgl.pushModelMatrix();
    mat4.scale(cgl.mMatrix,cgl.mMatrix, vScale);
    trigger.trigger();
    cgl.popModelMatrix();
};

function scaleChanged()
{
    var s=scale.get();
    vec3.set(vScale, s,s,s);
}



};

Ops.Gl.Matrix.Scale.prototype = new CABLES.Op();
CABLES.OPS["50e7f565-0cdb-47ca-912b-87c04e2f00e3"]={f:Ops.Gl.Matrix.Scale,objName:"Ops.Gl.Matrix.Scale"};

Ops.Array.ArrayUnpack3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const inArray1=op.inArray("Array in xyz"),
    outArray1=op.outArray("Array 1 out"),
    outArray2=op.outArray("Array 2 out"),
    outArray3=op.outArray("Array 3 out"),
    outArrayLength = op.outNumber("Array lengths");

var showingError = false;

const arr1=[];
const arr2=[];
const arr3=[];

inArray1.onChange = update;

function update()
{
    var array1=inArray1.get();

    if(!array1)
    {
        outArray1.set(null);
        return;
    }

    if(array1.length % 3 !== 0)
    {
        if(!showingError)
        {
            op.uiAttr({error:"Arrays length not divisible by 3 !"});
            outArrayLength.set(0);
            showingError = true;
        }
        return;
    }

    if(showingError)
    {
        showingError = false;
        op.uiAttr({error:null});
    }

    arr1.length = Math.floor(array1.length/3);
    arr2.length = Math.floor(array1.length/3);
    arr3.length = Math.floor(array1.length/3);

    for(var i=0;i<array1.length/3;i++)
    {
        arr1[i] = array1[i*3];
        arr2[i] = array1[i*3+1];
        arr3[i] = array1[i*3+2];
    }

    outArray1.set(null);
    outArray2.set(null);
    outArray3.set(null);
    outArray1.set(arr1);
    outArray2.set(arr2);
    outArray3.set(arr3);
    outArrayLength.set(arr1.length);
}



};

Ops.Array.ArrayUnpack3.prototype = new CABLES.Op();
CABLES.OPS["fa671f66-6957-41e6-ac35-d615b7c29285"]={f:Ops.Array.ArrayUnpack3,objName:"Ops.Array.ArrayUnpack3"};

Ops.WebAudio.AudioAnalyzer = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var audioCtx=CABLES.WEBAUDIO.createAudioContext(op);
const inFftSize = op.inSwitch("FFT size",[64,128,256,512,1024],256);
const analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = 0.3;
analyser.fftSize = 256;

const refresh=op.addInPort(new CABLES.Port(op,"refresh",CABLES.OP_PORT_TYPE_FUNCTION));
const audioIn = CABLES.WEBAUDIO.createAudioInPort(op, "Audio In", analyser);
const anData=op.inValueSelect("Data",["Frequency","Time Domain"],"Frequency");

const next=op.outTrigger("Next");
const audioOutPort = CABLES.WEBAUDIO.createAudioOutPort(op, "Audio Out", analyser);
const avgVolume=op.addOutPort(new CABLES.Port(op, "average volume",CABLES.OP_PORT_TYPE_VALUE));
const fftOut=op.addOutPort(new CABLES.Port(op, "fft",CABLES.OP_PORT_TYPE_ARRAY));

var fftBufferLength = analyser.frequencyBinCount;
var fftDataArray = new Uint8Array(fftBufferLength);
var getFreq=true;
var array=null;

inFftSize.onChange = function()
{
    analyser.fftSize = inFftSize.get();
}

anData.onChange=function() {
    if(anData.get()=="Frequency")getFreq=true;
    if(anData.get()=="Time Domain")getFreq=false;
};

refresh.onTriggered = function()
{
    analyser.minDecibels = -90;
    analyser.maxDecibels = 0;

    if(fftBufferLength != analyser.frequencyBinCount)
    {
        console.log("change!");
        fftBufferLength = analyser.frequencyBinCount;
        fftDataArray = new Uint8Array(fftBufferLength);
    }

    if(!fftDataArray)
    {
        //op.log("[audioanalyzer] fftDataArray is null, returning.");
        return;
    }

    var values = 0;

    for (var i = 0; i < fftDataArray.length; i++) values += fftDataArray[i];

    var average = values / fftDataArray.length;

    avgVolume.set(average/128);
    try
    {
        if(getFreq) analyser.getByteFrequencyData(fftDataArray);
            else analyser.getByteTimeDomainData(fftDataArray);
    }
    catch(e) { op.log(e); }

    fftOut.set(null);
    fftOut.set(fftDataArray);

    next.trigger();
};



};

Ops.WebAudio.AudioAnalyzer.prototype = new CABLES.Op();
CABLES.OPS["22523fae-a623-401d-b952-a57c26de4b4e"]={f:Ops.WebAudio.AudioAnalyzer,objName:"Ops.WebAudio.AudioAnalyzer"};

Ops.WebAudio.Output = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
op.requirements=[CABLES.Requirements.WEBAUDIO];

var audioCtx = CABLES.WEBAUDIO.createAudioContext(op);

// constants
var VOLUME_DEFAULT = 1.0;
var VOLUME_MIN = 0;
var VOLUME_MAX = 1;

// vars
var gainNode = audioCtx.createGain();
var destinationNode = audioCtx.destination;
gainNode.connect(destinationNode);
var masterVolume = 1;

// inputs
var audioInPort = CABLES.WEBAUDIO.createAudioInPort(op, "Audio In", gainNode);
var volumePort = op.inValueSlider("Volume", VOLUME_DEFAULT);
var mutePort = op.inValueBool("Mute", false);

// functions
// sets the volume, multiplied by master volume
function setVolume() {
    var volume = volumePort.get() * masterVolume;
    if(volume >= VOLUME_MIN && volume <= VOLUME_MAX) {
        // gainNode.gain.value = volume;
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    } else {
        // gainNode.gain.value = VOLUME_DEFAULT * masterVolume;
        gainNode.gain.setValueAtTime(VOLUME_DEFAULT * masterVolume, audioCtx.currentTime);
    }
}

function mute(b) {
    if(b) {
        // gainNode.gain.value = 0;
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    } else {
        setVolume();
    }
}

// change listeners
mutePort.onChange = function() {
    mute(mutePort.get());
};

volumePort.onChange = function() {
    if(mutePort.get()) {
        return;
    }
    setVolume();
};

op.onMasterVolumeChanged = function(v) {
    masterVolume = v;
    setVolume();
};




};

Ops.WebAudio.Output.prototype = new CABLES.Op();
CABLES.OPS["53fdbf4a-bc8d-4c5d-a698-f34fdeb53827"]={f:Ops.WebAudio.Output,objName:"Ops.WebAudio.Output"};

Ops.Sequence = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};

const exe=op.inTrigger("exe");
const exes=[];
const triggers=[];
const num=16;
exe.onTriggered=triggerAll;

function triggerAll()
{
    for(var i=0;i<triggers.length;i++) triggers[i].trigger();
}

for(var i=0;i<num;i++)
{
    triggers.push( op.outTrigger("trigger "+i));

    if(i<num-1)
    {
        var newExe=op.inTrigger("exe "+i);
        newExe.onTriggered=triggerAll;
        exes.push( newExe );
    }
}

};

Ops.Sequence.prototype = new CABLES.Op();
CABLES.OPS["a466bc1f-06e9-4595-8849-bffb9fe22f99"]={f:Ops.Sequence,objName:"Ops.Sequence"};

Ops.Array.RandomNumbersArray3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    numValues=op.inValueInt("numValues",100),
    min=op.inValueFloat("Min",-1),
    max=op.inValueFloat("Max",1),
    seed=op.inValueFloat("random seed"),
    closed=op.inValueBool("Last == First"),
    inInteger=op.inValueBool("Integer",false),
    values=op.outArray("values"),
    outTotalPoints = op.outNumber("Total points"),
    outArrayLength = op.outNumber("Array length");

op.setPortGroup("Value Range",[min,max]);
op.setPortGroup("",[seed,closed]);

values.ignoreValueSerialize=true;

closed.onChange=max.onChange=
    min.onChange=
    numValues.onChange=
    seed.onChange=
    values.onLinkChanged=
    inInteger.onChange=init;

var arr=[];
init();

function init()
{
    Math.randomSeed=seed.get();

    var isInteger=inInteger.get();

    var arrLength = arr.length=Math.floor(Math.abs(numValues.get()*3));
    for(var i=0;i<arrLength;i+=3)
    {
        if(!isInteger)
        {
            arr[i+0]=Math.seededRandom() * ( max.get() - min.get() ) + min.get() ;
            arr[i+1]=Math.seededRandom() * ( max.get() - min.get() ) + min.get() ;
            arr[i+2]=Math.seededRandom() * ( max.get() - min.get() ) + min.get() ;
        }
        else
        {
            arr[i+0]=Math.floor(Math.seededRandom() * ( max.get() - min.get() ) + min.get()) ;
            arr[i+1]=Math.floor(Math.seededRandom() * ( max.get() - min.get() ) + min.get()) ;
            arr[i+2]=Math.floor(Math.seededRandom() * ( max.get() - min.get() ) + min.get()) ;
        }
    }

    if(closed.get() && arrLength>3)
    {
        arr[arrLength-3+0]=arr[0];
        arr[arrLength-3+1]=arr[1];
        arr[arrLength-3+2]=arr[2];
    }

    values.set(null);
    values.set(arr);
    outTotalPoints.set(arrLength/3);
    outArrayLength.set(arrLength);
};


};

Ops.Array.RandomNumbersArray3.prototype = new CABLES.Op();
CABLES.OPS["7f981578-542e-417b-b304-8fbe41258772"]={f:Ops.Array.RandomNumbersArray3,objName:"Ops.Array.RandomNumbersArray3"};

Ops.Gl.Matrix.OrbitControls = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const render=op.inTrigger("render");
const minDist=op.inValueFloat("min distance");
const maxDist=op.inValueFloat("max distance");

const minRotY=op.inValue("min rot y",0);
const maxRotY=op.inValue("max rot y",0);

// const minRotX=op.inValue("min rot x",0);
// const maxRotX=op.inValue("max rot x",0);

const initialRadius=op.inValue("initial radius",0);
const initialAxis=op.inValueSlider("initial axis y");
const initialX=op.inValueSlider("initial axis x");

const mul=op.inValueFloat("mul");
const smoothness=op.inValueSlider("Smoothness",1.0);
const speedX=op.inValue("Speed X",1);
const speedY=op.inValue("Speed Y",1);

const active=op.inValueBool("Active",true);

const allowPanning=op.inValueBool("Allow Panning",true);
const allowZooming=op.inValueBool("Allow Zooming",true);
const allowRotation=op.inValueBool("Allow Rotation",true);
const restricted=op.inValueBool("restricted",true);
const pointerLock=op.inValueBool("Pointerlock",false);

const trigger=op.outTrigger("trigger");
const outRadius=op.outValue("radius");
const outYDeg=op.outValue("Rot Y");
const outXDeg=op.outValue("Rot X");

const inReset=op.inTriggerButton("Reset");

op.setPortGroup("Initial Values",[initialAxis,initialX,initialRadius]);
op.setPortGroup("Interaction",[mul,smoothness,speedX,speedY]);
op.setPortGroup("Boundaries",[minRotY,maxRotY,minDist,maxDist]);



mul.set(1);
minDist.set(0.05);
maxDist.set(99999);

inReset.onTriggered=reset;

const cgl=op.patch.cgl;
var eye=vec3.create();
var vUp=vec3.create();
var vCenter=vec3.create();
var viewMatrix=mat4.create();
var vOffset=vec3.create();

initialAxis.set(0.5);


var mouseDown=false;
var radius=5;
outRadius.set(radius);

var lastMouseX=0,lastMouseY=0;
var percX=0,percY=0;


vec3.set(vCenter, 0,0,0);
vec3.set(vUp, 0,1,0);

var tempEye=vec3.create();
var finalEye=vec3.create();
var tempCenter=vec3.create();
var finalCenter=vec3.create();

var px=0;
var py=0;

var divisor=1;
var element=null;
updateSmoothness();

op.onDelete=unbind;

var doLockPointer=false;

pointerLock.onChange=function()
{
    doLockPointer=pointerLock.get();
    console.log("doLockPointer",doLockPointer);
};

function reset()
{
    px=px%(Math.PI*2);
    py=py%(Math.PI*2);

    vec3.set(vOffset,0,0,0);
    vec3.set(vCenter, 0,0,0);
    vec3.set(vUp, 0,1,0);

    percX=(initialX.get()*Math.PI*2);
    percY=(initialAxis.get()-0.5);
    radius=initialRadius.get();
    eye=circlePos( percY );
}

function updateSmoothness()
{
    divisor=smoothness.get()*10+1.0;
}

smoothness.onChange=updateSmoothness;

var initializing=true;

function ip(val,goal)
{
    if(initializing)return goal;
    return val+(goal-val)/divisor;
}

var lastPy=0;
var lastPx=0;

render.onTriggered=function()
{
    cgl.pushViewMatrix();

    px=ip(px,percX);
    py=ip(py,percY);

    var degY=(py+0.5)*180;


    if(minRotY.get()!==0 && degY<minRotY.get())
    {
        degY=minRotY.get();
        py=lastPy;
    }
    else if(maxRotY.get()!==0 && degY>maxRotY.get())
    {
        degY=maxRotY.get();
        py=lastPy;
    }
    else
    {
        lastPy=py;
    }


    var degX=(px)*CGL.RAD2DEG;

    // if(minRotX.get()!==0 && degX<minRotX.get())
    // {
    //     degX=minRotX.get();
    //     px=lastPx;
    // }
    // else if(maxRotX.get()!==0 && degX>maxRotX.get())
    // {
    //     degX=maxRotX.get();
    //     px=lastPx;
    // }
    // else
    // {
    //     lastPx=px;
    // }



    outYDeg.set( degY );
    // outXDeg.set( (px)*180 );
    outXDeg.set( degX );


    circlePosi(eye, py );

    vec3.add(tempEye, eye, vOffset);
    vec3.add(tempCenter, vCenter, vOffset);

    finalEye[0]=ip(finalEye[0],tempEye[0]);
    finalEye[1]=ip(finalEye[1],tempEye[1]);
    finalEye[2]=ip(finalEye[2],tempEye[2]);

    finalCenter[0]=ip(finalCenter[0],tempCenter[0]);
    finalCenter[1]=ip(finalCenter[1],tempCenter[1]);
    finalCenter[2]=ip(finalCenter[2],tempCenter[2]);

    mat4.lookAt(viewMatrix, finalEye, finalCenter, vUp);
    mat4.rotate(viewMatrix, viewMatrix, px, vUp);
    mat4.multiply(cgl.vMatrix,cgl.vMatrix,viewMatrix);

    trigger.trigger();
    cgl.popViewMatrix();
    initializing=false;
};

function circlePosi(vec,perc)
{
    const mmul=mul.get();
    if(radius<minDist.get()*mmul)radius=minDist.get()*mmul;
    if(radius>maxDist.get()*mmul)radius=maxDist.get()*mmul;

    outRadius.set(radius*mmul);

    var i=0,degInRad=0;
    // var vec=vec3.create();
    degInRad = 360*perc/2*CGL.DEG2RAD;
    vec3.set(vec,
        Math.cos(degInRad)*radius*mmul,
        Math.sin(degInRad)*radius*mmul,
        0);
    return vec;
}


function circlePos(perc)
{
    const mmul=mul.get();
    if(radius<minDist.get()*mmul)radius=minDist.get()*mmul;
    if(radius>maxDist.get()*mmul)radius=maxDist.get()*mmul;

    outRadius.set(radius*mmul);

    var i=0,degInRad=0;
    var vec=vec3.create();
    degInRad = 360*perc/2*CGL.DEG2RAD;
    vec3.set(vec,
        Math.cos(degInRad)*radius*mmul,
        Math.sin(degInRad)*radius*mmul,
        0);
    return vec;
}

function onmousemove(event)
{
    if(!mouseDown) return;

    var x = event.clientX;
    var y = event.clientY;

    var movementX=(x-lastMouseX);
    var movementY=(y-lastMouseY);

    if(doLockPointer)
    {
        movementX=event.movementX*mul.get();
        movementY=event.movementY*mul.get();
    }

    movementX*=speedX.get();
    movementY*=speedY.get();

    if(event.which==3 && allowPanning.get())
    {
        vOffset[2]+=movementX*0.01*mul.get();
        vOffset[1]+=movementY*0.01*mul.get();
    }
    else
    if(event.which==2 && allowZooming.get())
    {
        radius+=movementY*0.05;
        eye=circlePos(percY);
    }
    else
    {
        if(allowRotation.get())
        {
            percX+=movementX*0.003;
            percY+=movementY*0.002;

            if(restricted.get())
            {
                if(percY>0.5)percY=0.5;
                if(percY<-0.5)percY=-0.5;
            }
        }
    }

    lastMouseX=x;
    lastMouseY=y;
}

function onMouseDown(event)
{
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    mouseDown=true;

    if(doLockPointer)
    {
        var el=op.patch.cgl.canvas;
        el.requestPointerLock = el.requestPointerLock || el.mozRequestPointerLock || el.webkitRequestPointerLock;
        if(el.requestPointerLock) el.requestPointerLock();
        else console.log("no t found");
        // document.addEventListener("mousemove", onmousemove, false);

        document.addEventListener('pointerlockchange', lockChange, false);
        document.addEventListener('mozpointerlockchange', lockChange, false);
        document.addEventListener('webkitpointerlockchange', lockChange, false);
    }
}

function onMouseUp()
{
    mouseDown=false;
    // cgl.canvas.style.cursor='url(/ui/img/rotate.png),pointer';

    if(doLockPointer)
    {
        document.removeEventListener('pointerlockchange', lockChange, false);
        document.removeEventListener('mozpointerlockchange', lockChange, false);
        document.removeEventListener('webkitpointerlockchange', lockChange, false);

        if(document.exitPointerLock) document.exitPointerLock();
        document.removeEventListener("mousemove", pointerLock, false);
    }
}

function lockChange()
{
    var el=op.patch.cgl.canvas;

    if (document.pointerLockElement === el || document.mozPointerLockElement === el || document.webkitPointerLockElement === el)
    {
        document.addEventListener("mousemove", onmousemove, false);
        console.log("listening...");
    }
}

function onMouseEnter(e)
{
    // cgl.canvas.style.cursor='url(/ui/img/rotate.png),pointer';
}

initialRadius.onChange=function()
{
    radius=initialRadius.get();
    reset();
};

initialX.onChange=function()
{
    px=percX=(initialX.get()*Math.PI*2);
};

initialAxis.onChange=function()
{
    py=percY=(initialAxis.get()-0.5);
    eye=circlePos(percY);
};

var onMouseWheel=function(event)
{
    if(allowZooming.get())
    {
        var delta=CGL.getWheelSpeed(event)*0.06;
        radius+=(parseFloat(delta))*1.2;

        eye=circlePos(percY);
        event.preventDefault();
    }
};

var ontouchstart=function(event)
{
    doLockPointer=false;
    if(event.touches && event.touches.length>0) onMouseDown(event.touches[0]);
};

var ontouchend=function(event)
{
    doLockPointer=false;
    onMouseUp();
};

var ontouchmove=function(event)
{
    doLockPointer=false;
    if(event.touches && event.touches.length>0) onmousemove(event.touches[0]);
};

active.onChange=function()
{
    if(active.get())bind();
        else unbind();
}


function setElement(ele)
{
    unbind();
    element=ele;
    bind();
}

function bind()
{
    element.addEventListener('mousemove', onmousemove);
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('mouseup', onMouseUp);
    element.addEventListener('mouseleave', onMouseUp);
    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('contextmenu', function(e){e.preventDefault();});
    element.addEventListener('wheel', onMouseWheel);

    element.addEventListener('touchmove', ontouchmove);
    element.addEventListener('touchstart', ontouchstart);
    element.addEventListener('touchend', ontouchend);
}

function unbind()
{
    if(!element)return;

    element.removeEventListener('mousemove', onmousemove);
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('mouseup', onMouseUp);
    element.removeEventListener('mouseleave', onMouseUp);
    element.removeEventListener('mouseenter', onMouseUp);
    element.removeEventListener('wheel', onMouseWheel);

    element.removeEventListener('touchmove', ontouchmove);
    element.removeEventListener('touchstart', ontouchstart);
    element.removeEventListener('touchend', ontouchend);
}

eye=circlePos(0);
setElement(cgl.canvas);


bind();

initialX.set(0.25);
initialRadius.set(0.05);


};

Ops.Gl.Matrix.OrbitControls.prototype = new CABLES.Op();
CABLES.OPS["eaf4f7ce-08a3-4d1b-b9f4-ebc0b7b1cde1"]={f:Ops.Gl.Matrix.OrbitControls,objName:"Ops.Gl.Matrix.OrbitControls"};




// **************************************************************
// 
// Ops.Array.ArrayLength
// 
// **************************************************************

Ops.Array.ArrayLength = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    array=op.inArray("array"),
    outLength=op.outValue("length");

outLength.ignoreValueSerialize=true;

function update()
{
    var l=0;
    if(array.get()) l=array.get().length;
    else l=-1;
    outLength.set(l);
}

array.onChange=update;


};

Ops.Array.ArrayLength.prototype = new CABLES.Op();
CABLES.OPS["ea508405-833d-411a-86b4-1a012c135c8a"]={f:Ops.Array.ArrayLength,objName:"Ops.Array.ArrayLength"};




// **************************************************************
// 
// Ops.Anim.Timer_v2
// 
// **************************************************************

Ops.Anim.Timer_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const playPause=op.inValueBool("Play",true);
const reset=op.inTriggerButton("Reset");
const outTime=op.outValue("Time");
const inSpeed=op.inValue("Speed",1);

var timer=new CABLES.Timer();
var lastTime=0;
var time=0;

playPause.onChange=setState;
setState();

function setState()
{
    if(playPause.get())
    {
        timer.play();
        op.patch.addOnAnimFrame(op);
    }
    else
    {
        timer.pause();
        op.patch.removeOnAnimFrame(op);
    }
}

reset.onTriggered=function()
{
    time=0;
    lastTime=0;
    timer.setTime(0);
    outTime.set(0);
};

op.onAnimFrame=function()
{
    if(timer.isPlaying())
    {
        timer.update();
        if(lastTime===0)
        {
            lastTime=timer.get();
            return;
        }

        const t=timer.get()-lastTime;
        lastTime=timer.get();
        time+=t*inSpeed.get();
        if(time!=time)time=0;
        outTime.set(time);
    }
};


};

Ops.Anim.Timer_v2.prototype = new CABLES.Op();
CABLES.OPS["aac7f721-208f-411a-adb3-79adae2e471a"]={f:Ops.Anim.Timer_v2,objName:"Ops.Anim.Timer_v2"};




// **************************************************************
// 
// Ops.Gl.MainLoop
// 
// **************************************************************

Ops.Gl.MainLoop = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const fpsLimit=op.inValue("FPS Limit",0);
const trigger=op.outTrigger("trigger");
const width=op.outValue("width");
const height=op.outValue("height");
const reduceLoadingFPS=op.inValueBool("Reduce FPS loading");
const clear=op.inValueBool("Clear",true);
const clearAlpha=op.inValueBool("ClearAlpha",true);
const fullscreen=op.inValueBool("Fullscreen Button",false);
const active=op.inValueBool("Active",true);
const hdpi=op.inValueBool("Hires Displays",false);

op.onAnimFrame=render;

hdpi.onChange=function()
{
    if(hdpi.get()) op.patch.cgl.pixelDensity=window.devicePixelRatio;
        else op.patch.cgl.pixelDensity=1;

    op.patch.cgl.updateSize();
    if(CABLES.UI) gui.setLayout();
};

active.onChange=function()
{
    op.patch.removeOnAnimFrame(op);

    if(active.get())
    {
        // op.patch.pause();
        // op.patch.removeOnAnimFrame(op);
        op.onAnimFrame=render;
        op.patch.addOnAnimFrame(op);
        console.log("adding again!");
    }


    // else op.patch.resume();

};


var cgl=op.patch.cgl;
var rframes=0;
var rframeStart=0;

if(!op.patch.cgl) op.uiAttr( { 'error': 'No webgl cgl context' } );

var identTranslate=vec3.create();
vec3.set(identTranslate, 0,0,0);
var identTranslateView=vec3.create();
vec3.set(identTranslateView, 0,0,-2);

fullscreen.onChange=updateFullscreenButton;
setTimeout(updateFullscreenButton,100);
var fsElement=null;

function updateFullscreenButton()
{
    function onMouseEnter()
    {
        if(fsElement)fsElement.style.display="block";
    }

    function onMouseLeave()
    {
        if(fsElement)fsElement.style.display="none";
    }

    op.patch.cgl.canvas.addEventListener('mouseleave', onMouseLeave);
    op.patch.cgl.canvas.addEventListener('mouseenter', onMouseEnter);

    if(fullscreen.get())
    {
        if(!fsElement)
        {
            fsElement = document.createElement('div');

            var container = op.patch.cgl.canvas.parentElement;
            if(container)container.appendChild(fsElement);

            fsElement.addEventListener('mouseenter', onMouseEnter);
            fsElement.addEventListener('click', function(e)
            {
                if(CABLES.UI && !e.shiftKey) gui.cycleRendererSize();
                    else
                    {
                        cgl.fullScreen();
                    }
            });
        }

        fsElement.style.padding="10px";
        fsElement.style.position="absolute";
        fsElement.style.right="5px";
        fsElement.style.top="5px";
        fsElement.style.width="20px";
        fsElement.style.height="20px";
        // fsElement.style.opacity="1.0";
        fsElement.style.cursor="pointer";
        fsElement.style['border-radius']="40px";
        fsElement.style.background="#444";
        fsElement.style["z-index"]="9999";
        fsElement.style.display="none";
        fsElement.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490 490" style="width:20px;height:20px;" xml:space="preserve" width="512px" height="512px"><g><path d="M173.792,301.792L21.333,454.251v-80.917c0-5.891-4.776-10.667-10.667-10.667C4.776,362.667,0,367.442,0,373.333V480     c0,5.891,4.776,10.667,10.667,10.667h106.667c5.891,0,10.667-4.776,10.667-10.667s-4.776-10.667-10.667-10.667H36.416     l152.459-152.459c4.093-4.237,3.975-10.99-0.262-15.083C184.479,297.799,177.926,297.799,173.792,301.792z" fill="#FFFFFF"/><path d="M480,0H373.333c-5.891,0-10.667,4.776-10.667,10.667c0,5.891,4.776,10.667,10.667,10.667h80.917L301.792,173.792     c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262     L469.333,36.416v80.917c0,5.891,4.776,10.667,10.667,10.667s10.667-4.776,10.667-10.667V10.667C490.667,4.776,485.891,0,480,0z" fill="#FFFFFF"/><path d="M36.416,21.333h80.917c5.891,0,10.667-4.776,10.667-10.667C128,4.776,123.224,0,117.333,0H10.667     C4.776,0,0,4.776,0,10.667v106.667C0,123.224,4.776,128,10.667,128c5.891,0,10.667-4.776,10.667-10.667V36.416l152.459,152.459     c4.237,4.093,10.99,3.975,15.083-0.262c3.992-4.134,3.992-10.687,0-14.82L36.416,21.333z" fill="#FFFFFF"/><path d="M480,362.667c-5.891,0-10.667,4.776-10.667,10.667v80.917L316.875,301.792c-4.237-4.093-10.99-3.976-15.083,0.261     c-3.993,4.134-3.993,10.688,0,14.821l152.459,152.459h-80.917c-5.891,0-10.667,4.776-10.667,10.667s4.776,10.667,10.667,10.667     H480c5.891,0,10.667-4.776,10.667-10.667V373.333C490.667,367.442,485.891,362.667,480,362.667z" fill="#FFFFFF"/></g></svg>';
    }
    else
    {
        if(fsElement)
        {
            fsElement.style.display="none";
            fsElement.remove();
            fsElement=null;
        }
    }
}


fpsLimit.onChange=function()
{
    op.patch.config.fpsLimit=fpsLimit.get()||0;
};

op.onDelete=function()
{
    cgl.gl.clearColor(0,0,0,0);
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);


};


op.patch.loading.setOnFinishedLoading(function(cb)
{
    op.patch.config.fpsLimit=fpsLimit.get();
});



function render(time)
{
    if(!active.get())return;
    if(cgl.aborted || cgl.canvas.clientWidth===0 || cgl.canvas.clientHeight===0)return;

    if(op.patch.loading.getProgress()<1.0 && reduceLoadingFPS.get())
    {
        op.patch.config.fpsLimit=5;
    }

    if(cgl.canvasWidth==-1)
    {
        cgl.setCanvas(op.patch.config.glCanvasId);
        return;
    }

    if(cgl.canvasWidth!=width.get() || cgl.canvasHeight!=height.get())
    {
        // cgl.canvasWidth=cgl.canvas.clientWidth;
        width.set(cgl.canvasWidth);
        // cgl.canvasHeight=cgl.canvas.clientHeight;
        height.set(cgl.canvasHeight);
    }

    if(CABLES.now()-rframeStart>1000)
    {
        CGL.fpsReport=CGL.fpsReport||[];
        if(op.patch.loading.getProgress()>=1.0 && rframeStart!==0)CGL.fpsReport.push(rframes);
        rframes=0;
        rframeStart=CABLES.now();
    }
    CGL.MESH.lastShader=null;
    CGL.MESH.lastMesh=null;

    cgl.renderStart(cgl,identTranslate,identTranslateView);

    if(clear.get())
    {
        cgl.gl.clearColor(0,0,0,1);
        cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
    }

    trigger.trigger();


    if(CGL.MESH.lastMesh)CGL.MESH.lastMesh.unBind();


    if(CGL.Texture.previewTexture)
    {
        if(!CGL.Texture.texturePreviewer) CGL.Texture.texturePreviewer=new CGL.Texture.texturePreview(cgl);
        CGL.Texture.texturePreviewer.render(CGL.Texture.previewTexture);
    }
    cgl.renderEnd(cgl);


    // cgl.printError('mainloop end');


    if(clearAlpha.get())
    {
        cgl.gl.clearColor(1, 1, 1, 1);
        cgl.gl.colorMask(false, false, false, true);
        cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT);
        cgl.gl.colorMask(true, true, true, true);
    }


    if(!cgl.frameStore.phong)cgl.frameStore.phong={};
    rframes++;
};


};

Ops.Gl.MainLoop.prototype = new CABLES.Op();
CABLES.OPS["b0472a1d-db16-4ba6-8787-f300fbdc77bb"]={f:Ops.Gl.MainLoop,objName:"Ops.Gl.MainLoop"};




// **************************************************************
// 
// Ops.Gl.ClearColor
// 
// **************************************************************

Ops.Gl.ClearColor = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    render=op.inTrigger("render"),
    trigger=op.outTrigger("trigger"),
    r=op.inFloatSlider("r",0.1),
    g=op.inFloatSlider("g",0.1),
    b=op.inFloatSlider("b",0.1),
    a=op.inFloatSlider("a",1);

r.setUiAttribs({ colorPick: true });

const cgl=op.patch.cgl;

render.onTriggered=function()
{
    cgl.gl.clearColor(r.get(),g.get(),b.get(),a.get());
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
    trigger.trigger();
};

};

Ops.Gl.ClearColor.prototype = new CABLES.Op();
CABLES.OPS["19b441eb-9f63-4f35-ba08-b87841517c4d"]={f:Ops.Gl.ClearColor,objName:"Ops.Gl.ClearColor"};




// **************************************************************
// 
// Ops.WebAudio.AudioBufferPlayer
// 
// **************************************************************

Ops.WebAudio.AudioBufferPlayer = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var audioCtx = CABLES.WEBAUDIO.createAudioContext(op);

// input ports
var audioBufferPort = op.inObject("Audio Buffer");
var playPort = op.inValueBool("Start / Stop", false);
var startTimePort = op.inValue("Start Time", 0);
var stopTimePort = op.inValue("Stop Time", 0);
var offsetPort = op.inValue("Offset", 0);
var autoPlayPort = op.inValueBool("Autoplay", false);
var loopPort = op.inValueBool("Loop", false);
var detunePort = op.inValue("Detune", 0);
var playbackRatePort = op.inValue("Playback Rate", 1);

// output ports
var audioOutPort = op.outObject("Audio Out");

// vars
var source = null;

// change listeners
audioBufferPort.onChange = function() {
    createAudioBufferSource();
    if(
        (autoPlayPort.get() && audioBufferPort.get()) ||
    (playPort.get() && audioBufferPort.get())
    ) {
        start(startTimePort.get());
    }
};
playPort.onChange = function() {
    if(source) {
        if(playPort.get()) {
            var startTime = startTimePort.get() || 0;
            start(startTime);    
        } else {
            var stopTime = stopTimePort.get() || 0;
            stop(stopTime);    
        } 
    }
};
loopPort.onChange = function() {
    if(source) {
        source.loop = loopPort.get() ? true : false;
    }
};

detunePort.onChange = setDetune;

function setDetune() {
    if(source) {
        var detune = detunePort.get() || 0;
        if(source.detune) {
            source.detune.setValueAtTime(
                detune,
                audioCtx.currentTime    
            );
        }
    }
}

playbackRatePort.onChange = setPlaybackRate;

function setPlaybackRate() {
    if(source) {
        var playbackRate = playbackRatePort.get() || 0;
        if(playbackRate >= source.playbackRate.minValue && playbackRate <= source.playbackRate.maxValue) {
            source.playbackRate.setValueAtTime(
                playbackRate,
                audioCtx.currentTime    
            );    
        }
    }
}

// functions
function createAudioBufferSource() {
    if(source)stop(0);
    source = audioCtx.createBufferSource();
    var buffer = audioBufferPort.get();
    if(buffer) {
        source.buffer = buffer;
    }
    source.onended = onPlaybackEnded;
    source.loop = loopPort.get();
    setPlaybackRate();
    setDetune();
    audioOutPort.set(source);
}

function start(time) {
    try {
        source.start(time,offsetPort.get()); // 0 = now
    } catch(e){
        // console.log(e);
    } // already playing!?
}

function stop(time) {
    try {
        source.stop(time); // 0 = now
    } catch(e) 
    {
        // console.log(e);
    } // not playing!?
}

function onPlaybackEnded() {
    createAudioBufferSource(); // we can only play back once, so we need to create a new one
}

};

Ops.WebAudio.AudioBufferPlayer.prototype = new CABLES.Op();
CABLES.OPS["05385277-92fc-4d49-b730-11f9ed5e5c0d"]={f:Ops.WebAudio.AudioBufferPlayer,objName:"Ops.WebAudio.AudioBufferPlayer"};




// **************************************************************
// 
// Ops.WebAudio.AudioBuffer
// 
// **************************************************************

Ops.WebAudio.AudioBuffer = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const audioCtx = CABLES.WEBAUDIO.createAudioContext(op);
const inUrlPort = op.inFile("URL",'audio');
const audioBufferPort = op.outObject("Audio Buffer");
const finishedLoadingPort = op.outValue("Finished Loading", false);
const sampleRatePort = op.outValue("Sample Rate", 0);
const lengthPort = op.outValue("Length", 0);
const durationPort = op.outValue("Duration", 0);
const numberOfChannelsPort = op.outValue("Number of Channels", 0);

// change listeners
inUrlPort.onChange = function() {
    var url=op.patch.getFilePath(inUrlPort.get());
    if(typeof url === 'string' && url.length > 1) {
        CABLES.WEBAUDIO.loadAudioFile(op.patch, url, onLoadFinished, onLoadFailed);
    }
};

function onLoadFinished(buffer) {
    lengthPort.set(buffer.length);
    durationPort.set(buffer.duration);
    numberOfChannelsPort.set(buffer.numberOfChannels);
    sampleRatePort.set(buffer.sampleRate);
    audioBufferPort.set(buffer);
    finishedLoadingPort.set(true);
    op.log("AudioBuffer loaded: ", buffer);
}

function onLoadFailed(e) {
    console.error("Error: Loading audio file failed: ", e);
    invalidateOutPorts();
}

function invalidateOutPorts() {
    lengthPort.set(0);
    durationPort.set(0);
    numberOfChannelsPort.set(0);
    sampleRatePort.set(0);
    audioBufferPort.set(0);
    finishedLoadingPort.set(false);
}

};

Ops.WebAudio.AudioBuffer.prototype = new CABLES.Op();
CABLES.OPS["2cf4b0a1-b657-405b-8bf9-8555dbd5c231"]={f:Ops.WebAudio.AudioBuffer,objName:"Ops.WebAudio.AudioBuffer"};




// **************************************************************
// 
// Ops.Sidebar.DisplayValue
// 
// **************************************************************

Ops.Sidebar.DisplayValue = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
var parentPort = op.inObject('link');
var labelPort = op.inValueString('Text', 'Value');
var valuePort = op.inValueString('Value', '');

// outputs
var siblingsPort = op.outObject('childs');

// vars
var el = document.createElement('div');
el.classList.add('sidebar__item');
el.classList.add('sidebar__value-display');
var label = document.createElement('div');
label.classList.add('sidebar__item-label');
var labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);
var value = document.createElement('div');
value.textContent = valuePort.get();
value.classList.add('sidebar__item-value-label');
el.appendChild(value);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
valuePort.onChange = onValueChanged;
op.onDelete = onDelete;

// functions

function onValueChanged() {
    value.textContent = valuePort.get();
}

function onLabelTextChanged() {
    var labelText = labelPort.get();
    label.textContent = labelText;
    if(CABLES.UI) {
        op.setTitle('Value: ' + labelText);    
    }
}

function onParentChanged() {
    var parent = parentPort.get();
    if(parent && parent.parentElement) {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    } else { // detach
        if(el.parentElement) {
            el.parentElement.removeChild(el);    
        }
    }
}

function showElement(el) {
    if(el) {
        el.style.display = 'block';
    }
}

function hideElement(el) {
    if(el) {
        el.style.display = 'none';
    }
}

function onDelete() {
    removeElementFromDOM(el);
}

function removeElementFromDOM(el) {
    if(el && el.parentNode && el.parentNode.removeChild) {
        el.parentNode.removeChild(el);    
    }
}


};

Ops.Sidebar.DisplayValue.prototype = new CABLES.Op();
CABLES.OPS["3cdfb818-64ac-47f6-86fb-fdaf84343956"]={f:Ops.Sidebar.DisplayValue,objName:"Ops.Sidebar.DisplayValue"};




// **************************************************************
// 
// Ops.Math.Math
// 
// **************************************************************

Ops.Math.Math = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const num0 = op.inFloat("number 0",0),
    num1 = op.inFloat("number 1",0),
    mathDropDown = op.inSwitch("math mode",['+','-','*','/','%','min','max'], "+"),
    result = op.outNumber("result");

num0.onChange = num1.onChange = mathDropDown.onChange = update;

function update()
{
    var mode = mathDropDown.get();
    var n0 = num0.get();
    var n1 = num1.get();

    op.setUiAttrib({"extendTitle":mode});

    if(mode === "+")
    {
       result.set(n0 + n1);
    }
    else if(mode === "-")
    {
       result.set(n0 - n1);
    }
    else if(mode === "*")
    {
       result.set(n0 * n1);
    }
    else if(mode === "/")
    {
       result.set(n0 / n1);
    }
    else if(mode === "%")
    {
       result.set(n0 % n1);
    }
    else if(mode === "min")
    {
       result.set( Math.min(n0,n1));
    }
    else if(mode === "max")
    {
       result.set(Math.max(n0,n1));
    }
}

};

Ops.Math.Math.prototype = new CABLES.Op();
CABLES.OPS["e9fdcaca-a007-4563-8a4d-e94e08506e0f"]={f:Ops.Math.Math,objName:"Ops.Math.Math"};




// **************************************************************
// 
// Ops.User.l6n.GetSoundcloud
// 
// **************************************************************

Ops.User.l6n.GetSoundcloud = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const clientId="6f693b837b47b59a17403e79bcff3626";

const
    soundCloudUrl=op.inString("SoundCloud URL"),
    streamUrl=op.outValue("Stream URL"),
    artworkUrl=op.outValue("Artwork URL"),
    title=op.outValue("Title"),
    result=op.outObject("Result");

streamUrl.ignoreValueSerialize=true;
artworkUrl.ignoreValueSerialize=true;
streamUrl.ignoreValueSerialize=true;
title.ignoreValueSerialize=true;
soundCloudUrl.onChange=resolve;

function resolve()
{
    if(soundCloudUrl.get())
        CABLES.ajax(
            'https://api.soundcloud.com/resolve.json?url='+soundCloudUrl.get()+'&client_id='+clientId,
            function(err,_data,xhr)
            {
                var data=JSON.parse(_data);
                streamUrl.set(data.stream_url+"?client_id="+clientId);
                artworkUrl.set(data.artwork_url);
                title.set(data.title);
                console.log('stream url:'+data.stream_url);
                console.log(data);
            });

}


};

Ops.User.l6n.GetSoundcloud.prototype = new CABLES.Op();





// **************************************************************
// 
// Ops.Boolean.ToggleBool
// 
// **************************************************************

Ops.Boolean.ToggleBool = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    trigger=op.inTriggerButton("trigger"),
    reset=op.inTriggerButton("reset"),
    outBool=op.outValue("result");

var theBool=false;
outBool.set(theBool);
outBool.ignoreValueSerialize=true;

trigger.onTriggered=function()
{
    theBool=!theBool;
    outBool.set(theBool);
};

reset.onTriggered=function()
{
    theBool=false;
    outBool.set(theBool);
};



};

Ops.Boolean.ToggleBool.prototype = new CABLES.Op();
CABLES.OPS["712a25f4-3a93-4042-b8c5-2f56169186cc"]={f:Ops.Boolean.ToggleBool,objName:"Ops.Boolean.ToggleBool"};




// **************************************************************
// 
// Ops.Sidebar.Sidebar
// 
// **************************************************************

Ops.Sidebar.Sidebar = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={style_css:"/*\n * SIDEBAR\n */\n\n.icon-chevron-down {\n\t\n    top: 2px;\n    right: 9px;\n}\n\n.iconsidebar-chevron-up {\n\tbackground-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4=);\n    top: 2px;\n    right: 9px;\n}\n\n\n.sidebar-cables-right\n{\n    right: 0px;\n    left: initial !important;\n}\n\n.sidebar-cables {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 100000;\n  color: #BBBBBB;\n  width: 220px;\n  max-height: 100%;\n  box-sizing: border-box;\n  overflow-y: auto;\n  overflow-x: hidden;\n  font-size: 13px;\n  font-family: Arial;\n  line-height: 1em; /* prevent emojis from breaking height of the title */\n  --sidebar-border-radius: 4px;\n  --sidebar-monospace-font-stack: \"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, Courier, monospace;\n  --sidebar-hover-transition-time: .2s;\n}\n\n.sidebar-cables::selection {\n    background-color: #24baa7;\n    color: #EEEEEE;\n}\n\n.sidebar-cables::-webkit-scrollbar {\n    background-color: transparent;\n    --cables-scrollbar-width: 8px;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables::-webkit-scrollbar-track {\n    background-color: transparent;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables::-webkit-scrollbar-thumb {\n    background-color: #333333;\n    border-radius: 4px;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables--closed {\n  width: auto;\n}\n\n.sidebar__close-button {\n  background-color: #1A1A1A;\n  -webkit-user-select: none;  /* Chrome all / Safari all */\n  -moz-user-select: none;     /* Firefox all */\n  -ms-user-select: none;      /* IE 10+ */\n  user-select: none;          /* Likely future */ \n  transition: background-color var(--sidebar-hover-transition-time);\n  color: #CCCCCC;\n  height: 22px;\n  box-sizing: border-box;\n  padding-top: 2px;\n  text-align: center;\n  cursor: pointer;\n  border-top: 1px solid #272727;\n  border-radius: 0 0 var(--sidebar-border-radius) var(--sidebar-border-radius);\n  opacity: 1.0;\n  transition: opacity 0.3s;\n  overflow: hidden;\n}\n\n.sidebar__close-button-icon {\n    display: inline-block;\n    width: 21px;\n    height: 20px;\n    position: relative;\n    top: -1px;\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4=);\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-repeat: no-repeat;\n    background-position: 0 -1px;\n}\n\n.sidebar--closed .sidebar__close-button {\n    margin-top: 8px;\n    margin-left: 8px;\n    padding-top: 13px;\n    padding-left: 11px;\n    padding-right: 11px;\n    width: 46px;\n    height: 46px;\n    border-radius: 50%;\n    cursor: pointer;\n    opacity: 0.3;\n}\n\n.sidebar--closed .sidebar__close-button-icon {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjE3cHgiIHZpZXdCb3g9IjAgMCAyMiAxNyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Hcm91cCAzPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9IkNhbnZhcy1TaWRlYmFyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJEZXNrdG9wLWdyZWVuLWJsdWlzaC1Db3B5LTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMC4wMDAwMDAsIC0yMi4wMDAwMDApIj4gICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCAyMi4wMDAwMDApIj4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuNSwyLjUgTDIuNSwyLjUiIGlkPSJMaW5lLTIiIHN0cm9rZT0iIzk3OTc5NyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PC9wYXRoPiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuNSwyLjUgTDIxLjUsMi41IiBpZD0iTGluZS0yIiBzdHJva2U9IiM5Nzk3OTciIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiPjwvcGF0aD4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuNSw4LjUgTDExLjUsOC41IiBpZD0iTGluZS0yIiBzdHJva2U9IiM5Nzk3OTciIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiPjwvcGF0aD4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5LjUsOC41IEwyMS41LDguNSIgaWQ9IkxpbmUtMiIgc3Ryb2tlPSIjOTc5Nzk3IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIj48L3BhdGg+ICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLjUsMTQuNSBMNS41LDE0LjUiIGlkPSJMaW5lLTIiIHN0cm9rZT0iIzk3OTc5NyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PC9wYXRoPiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTMuNSwxNC41IEwyMS41LDE0LjUiIGlkPSJMaW5lLTIiIHN0cm9rZT0iIzk3OTc5NyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PC9wYXRoPiAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMiIGZpbGw9IiM5Nzk3OTciIGN4PSI2LjUiIGN5PSIyLjUiIHI9IjIuNSI+PC9jaXJjbGU+ICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMyIgZmlsbD0iIzk3OTc5NyIgY3g9IjE1LjUiIGN5PSI4LjUiIHI9IjIuNSI+PC9jaXJjbGU+ICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMyIgZmlsbD0iIzk3OTc5NyIgY3g9IjkuNSIgY3k9IjE0LjUiIHI9IjIuNSI+PC9jaXJjbGU+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);\n    background-position: 0px 0px;\n}\n\n.sidebar__close-button:hover {\n  background-color: #111111;\n  opacity: 1.0 !important;\n}\n\n/*\n * SIDEBAR ITEMS\n */\n\n.sidebar__items {\n  /* max-height: 1000px; */\n  /* transition: max-height 0.5;*/ \n}\n\n.sidebar--closed .sidebar__items {\n  /* max-height: 0; */\n  height: 0;\n  display: none;\n  pointer-interactions: none;\n}\n\n/*\n * SIDEBAR GROUP\n */\n\n.sidebar__group {\n  background-color: #1A1A1A;\n  overflow: hidden;\n  box-sizing: border-box;\n  animate: height;\n  /* max-height: 1000px; */\n  /* transition: max-height 0.5s; */\n  --sidebar-group-header-height: 28px;\n}\n\n.sidebar__group--closed {\n  /* max-height: 13px; */\n  height: var(--sidebar-group-header-height);\n}\n\n.sidebar__group-header {\n  box-sizing: border-box;\n  color: #EEEEEE;\n  -webkit-user-select: none;  /* Chrome all / Safari all */\n  -moz-user-select: none;     /* Firefox all */\n  -ms-user-select: none;      /* IE 10+ */\n  user-select: none;          /* Likely future */ \n  height: var(--sidebar-group-header-height);\n  padding-top: 7px;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  cursor: pointer;\n  transition: background-color var(--sidebar-hover-transition-time);\n  position: relative;\n}\n\n.sidebar__group-header:hover {\n  background-color: #111111;\n}\n\n.sidebar__group-header-title {\n  text-align: center;\n  overflow: hidden;\n  padding: 0 24px;\n}\n\n.sidebar__group-header-icon {\n    width: 17px;\n    height: 14px;\n    background-repeat: no-repeat;\n    display: inline-block;\n    position: absolute;\n    background-size: cover;\n    \n    /* icon open */\n    /* feather icon: chevron up */\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4=);\n    top: 4px;\n    right: 5px;\n    opacity: 0.0;\n    transition: opacity 0.3;\n}\n\n.sidebar__group-header:hover .sidebar__group-header-icon {\n    opacity: 1.0;\n}\n\n/* icon closed */\n.sidebar__group--closed .sidebar__group-header-icon {\n    /* feather icon: chevron down */\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);\n    top: 4px;\n    right: 5px;\n}\n\n/*\n * SIDEBAR ITEM\n */\n\n.sidebar__item {\n  background-color: #222222;\n  box-sizing: border-box;\n  padding: 7px;\n}\n\n.sidebar__item-label {\n  display: inline-block;\n  -webkit-user-select: none;  /* Chrome all / Safari all */\n  -moz-user-select: none;     /* Firefox all */\n  -ms-user-select: none;      /* IE 10+ */\n  user-select: none;          /* Likely future */ \n  width: calc(50% - 7px);\n  margin-right: 7px;\n  max-height: 1em;\n  text-overflow: ellipsis;\n  /* overflow: hidden; */\n}\n\n.sidebar__item-value-label {\n  font-family: var(--sidebar-monospace-font-stack);\n  display: inline-block;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  max-width: 50%;\n}\n\n.sidebar__item-value-label::selection {\n    background-color: #24baa7;\n    color: #EEEEEE;\n}\n\n.sidebar__item + .sidebar__item,\n.sidebar__item + .sidebar__group,\n.sidebar__group + .sidebar__item,\n.sidebar__group + .sidebar__group {\n  border-top: 1px solid #272727;\n}\n\n/*\n * SIDEBAR ITEM TOGGLE\n */\n\n.sidebar__toggle {\n    cursor: pointer;    \n}\n\n.sidebar__toggle-input {\n  --sidebar-toggle-input-color: #CCCCCC;\n  --sidebar-toggle-input-color-hover: #EEEEEE;\n  --sidebar-toggle-input-border-size: 2px;\n  display: inline;\n  float: right;\n  box-sizing: border-box;\n  border-radius: 50%;\n  cursor: pointer;\n  --toggle-size: 11px;\n  margin-top: 2px;\n  background-color: transparent;\n  border: var(--sidebar-toggle-input-border-size) solid var(--sidebar-toggle-input-color);\n  width: var(--toggle-size);\n  height: var(--toggle-size);\n  transition: background-color var(--sidebar-hover-transition-time);\n  transition: border-color var(--sidebar-hover-transition-time);\n}\n.sidebar__toggle:hover .sidebar__toggle-input {\n  border-color: var(--sidebar-toggle-input-color-hover);\n}\n\n.sidebar__toggle .sidebar__item-value-label {\n  -webkit-user-select: none;  /* Chrome all / Safari all */\n  -moz-user-select: none;     /* Firefox all */\n  -ms-user-select: none;      /* IE 10+ */\n  user-select: none;          /* Likely future */ \n  max-width: calc(50% - 12px);\n}\n.sidebar__toggle-input::after { clear: both; }\n\n.sidebar__toggle--active .sidebar__toggle-input {\n  transition: background-color var(--sidebar-hover-transition-time);\n  background-color: var(--sidebar-toggle-input-color);\n}\n.sidebar__toggle--active .sidebar__toggle-input:hover {\n  background-color: var(--sidebar-toggle-input-color-hover);\n  border-color: var(--sidebar-toggle-input-color-hover);\n  transition: background-color var(--sidebar-hover-transition-time);\n  transition: border-color var(--sidebar-hover-transition-time);\n}\n\n/*\n * SIDEBAR ITEM BUTTON\n */\n\n.sidebar__button {}\n\n.sidebar__button-input {\n  -webkit-user-select: none;  /* Chrome all / Safari all */\n  -moz-user-select: none;     /* Firefox all */\n  -ms-user-select: none;      /* IE 10+ */\n  user-select: none;          /* Likely future */ \n  height: 24px;\n  background-color: #444444;\n  color: #CCCCCC;\n  box-sizing: border-box;\n  padding-top: 5px;\n  text-align: center;\n  border-radius: var(--sidebar-border-radius);\n  cursor: pointer;\n}\n\n.sidebar__button-input:hover {\n  background-color: #555555;\n}\n\n/*\n * VALUE DISPLAY (shows a value)\n */\n\n.sidebar__value-display {}\n\n/*\n * SLIDER\n */\n\n.sidebar__slider {\n  --sidebar-slider-input-height: 18px;\n}\n\n.sidebar__slider-input-wrapper {\n  width: 100%;\n  margin-top: 10px;\n  position: relative;\n}\n\n.sidebar__slider-input {\n  -webkit-appearance: none;  /* Override default CSS styles */\n  appearance: none;\n  margin: 0;\n  width: 100%;\n  height: var(--sidebar-slider-input-height);\n  background: #333333;\n  cursor: pointer;\n  outline: none;\n  -webkit-transition: .2s; /* 0.2 seconds transition on hover */\n  transition: background-color .2s;\n  border: none;\n}\n\n.sidebar__slider-input:focus, .sidebar__slider-input:hover {\n    border: none;\n}\n\n.sidebar__slider-input-active-track {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: #CCCCCC; \n  pointer-events: none;\n  height: var(--sidebar-slider-input-height);\n  /* width: 10px; */\n}\n\n/* Mouse-over effects */\n.sidebar__slider-input:hover {\n  background-color: #444444;\n}\n\n/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */ \n.sidebar__slider-input::-webkit-slider-thumb {\n    -webkit-appearance: none; /* Override default look */\n    appearance: none;\n    width: var(--sidebar-slider-input-height);\n    /* width: 0 !important; */\n    height: var(--sidebar-slider-input-height);\n    background: #EEEEEE !important;\n    z-index: 999999999999 !important;\n    border: none;\n    border-radius: 0 !important;\n    cursor: pointer;\n}\n.sidebar__slider-input:hover ::-webkit-slider-thumb {\n  background-color: #EEEEEE !important;\n}\n\n.sidebar__slider-input::-moz-range-thumb {\n    /* width: var(--sidebar-slider-input-height); */\n    width: 0 !important;\n    height: var(--sidebar-slider-input-height);\n    background: #EEEEEE;\n    cursor: pointer;\n    border-radius: 0 !important;\n    border: none;\n    outline: 0;\n    z-index: 99999999999999999 !important;\n}\n\n.sidebar__slider-input::-moz-range-track {\n  background-color: transparent;\n}\n\n.sidebar__slider-input::-moz-range-thumb:hover {\n  /* background-color: #EEEEEE; */\n}\n\n.sidebar__slider-input-wrapper:hover .sidebar__slider-input-active-track {\n  background-color: #EEEEEE;  \n}\n\n.sidebar__slider-input-wrapper:hover .sidebar__slider-input::-moz-range-thumb {\n  background-color: #EEEEEE !important;  \n}\n\n.sidebar__slider-input-wrapper:hover .sidebar__slider-input::-webkit-slider-thumb {\n  background-color: #EEEEEE;  \n}\n\n.sidebar__slider input[type=text] {\n    box-sizing: border-box;\n    background-color: #333333;\n    color: #BBBBBB;\n    display: inline-block;\n    width: 50%;\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n} \n\n.sidebar__slider input[type=text]:active, \n.sidebar__slider input[type=text]:focus,\n.sidebar__slider input[type=text]:hover {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\n/*\n * TEXT / DESCRIPTION\n */\n \n.sidebar__text .sidebar__item-label {\n    width: auto;\n    display: block;\n    max-height: none;\n    margin-right: 0;\n    line-height: 1.1em;\n} \n\n/*\n * SIDEBAR INPUT\n */\n.sidebar__text-input input[type=text] {\n    box-sizing: border-box;\n    background-color: #333333;\n    color: #BBBBBB;\n    display: inline-block;\n    width: 50%;\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n} \n\n.sidebar__text-input input[type=text]:active, \n.sidebar__text-input input[type=text]:focus,\n.sidebar__text-input input[type=text]:hover {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\n/*\n * SIDEBAR SELECT\n */\n \n .sidebar__select {}\n .sidebar__select-select {\n    color: #BBBBBB;\n    -webkit-appearance: none; \n    -moz-appearance: none;\n    appearance: none;\n    box-sizing: border-box;\n    width: 50%;\n    height: 18px;\n    background-color: #333333;\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);\n    background-repeat: no-repeat;\n    background-position: 87px 1px;\n    background-size: 16px 16px;\n    margin: 0;\n    padding: 0 0 0 4px;\n    border-radius: 0;\n    border: none;\n    cursor: pointer;\n    outline: none;\n }\n \n.sidebar__select-select:hover,\n.sidebar__select-select:active,\n.sidebar__select-select:active {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\n/*\n * COLOR PICKER\n */\n \n .sidebar__color-picker-color-input {}\n \n .sidebar__color-picker input[type=text] {\n    box-sizing: border-box;\n    background-color: #333333;\n    color: #BBBBBB;\n    display: inline-block;\n    width: calc(50% - 21px); /* 50% minus space of picker circle */\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n    margin-right: 7px;\n} \n\n.sidebar__color-picker input[type=text]:active, \n.sidebar__color-picker input[type=text]:focus,\n.sidebar__color-picker input[type=text]:hover {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\n.sidebar__color-picker input[type=color],\n.sidebar__palette-picker input[type=color] {\n    display: inline-block;\n    border-radius: 100%;\n    height: 14px;\n    width: 14px;\n    padding: 0;\n    border: none;\n    border-color: transparent;\n    outline: none;\n    background: none;\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    cursor: pointer;\n    position: relative;\n    top: 3px;\n}\n.sidebar__color-picker input[type=color]:focus,\n.sidebar__palette-picker input[type=color]:focus {\n    outline: none;\n}\n.sidebar__color-picker input[type=color]::-moz-color-swatch,\n.sidebar__palette-picker input[type=color]::-moz-color-swatch {\n    border: none;\n}\n.sidebar__color-picker input[type=color]::-webkit-color-swatch-wrapper,\n.sidebar__palette-picker input[type=color]::-webkit-color-swatch-wrapper {\n    padding: 0;\t\n}\n.sidebar__color-picker input[type=color]::-webkit-color-swatch,\n.sidebar__palette-picker input[type=color]::-webkit-color-swatch {\n    border: none;\n    border-radius: 100%;\n}\n\n/*\n * Palette Picker\n */\n.sidebar__palette-picker .sidebar__palette-picker-color-input.first {\n    margin-left: 0;\n}\n.sidebar__palette-picker .sidebar__palette-picker-color-input.last {\n    margin-right: 0;\n}\n.sidebar__palette-picker .sidebar__palette-picker-color-input {\n    margin: 0 4px;\n}\n\n.sidebar__palette-picker .circlebutton {\n    width: 14px;\n    height: 14px;\n    border-radius: 1em;\n    display: inline-block;\n    top: 3px;\n    position: relative;\n}\n\n/*\n * Preset\n */\n.sidebar__item-presets-preset\n{\n    padding:4px;\n    cursor:pointer;\n    padding-left:8px;\n    padding-right:8px;\n    margin-right:4px;\n    background-color:#444;\n\n}\n\n.sidebar__item-presets-preset:hover\n{\n    background-color:#666;\n}",};
// vars
const CSS_ELEMENT_CLASS = 'cables-sidebar-style'; /* class for the style element to be generated */
const CSS_ELEMENT_DYNAMIC_CLASS = 'cables-sidebar-dynamic-style'; /* things which can be set via op-port, but not attached to the elements themselves, e.g. minimized opacity */
const SIDEBAR_CLASS = 'sidebar-cables';
const SIDEBAR_ID = 'sidebar'+CABLES.uuid();
const SIDEBAR_ITEMS_CLASS = 'sidebar__items';
const SIDEBAR_OPEN_CLOSE_BTN_CLASS = 'sidebar__close-button';
const SIDEBAR_OPEN_CLOSE_BTN_ICON_CLASS = 'sidebar__close-button-icon';
const BTN_TEXT_OPEN = ''; // 'Close';
const BTN_TEXT_CLOSED = ''; // 'Show Controls';
var cssFileContent = attachments.style_css; /* the CSS style attachment */
let openCloseBtn = null;
let openCloseBtnIcon = null;

// inputs
var visiblePort = op.inValueBool("Visible", true);
var opacityPort = op.inValueSlider('Opacity', 1);
var defaultMinimizedPort = op.inValueBool('Default Minimized');
var minimizedOpacityPort = op.inValueSlider('Minimized Opacity', 0.5);

var side = op.inValueBool('Side');

// outputs
var childrenPort = op.outObject('childs');

var sidebarEl = document.querySelector('.' + SIDEBAR_ID);
if(!sidebarEl) {
    sidebarEl = initSidebarElement();
}
if(!sidebarEl) return;
var sidebarItemsEl = sidebarEl.querySelector('.' + SIDEBAR_ITEMS_CLASS);
childrenPort.set({
    parentElement: sidebarItemsEl,
    parentOp: op,
});
onDefaultMinimizedPortChanged();
initSidebarCss();
updateDynamicStyles();

// change listeners
visiblePort.onChange = onVisiblePortChange;
opacityPort.onChange = onOpacityPortChange;
defaultMinimizedPort.onChange = onDefaultMinimizedPortChanged;
minimizedOpacityPort.onChange = onMinimizedOpacityPortChanged;
op.onDelete = onDelete;

// functions

function onMinimizedOpacityPortChanged() {
    updateDynamicStyles();
}

side.onChange=function()
{
    if(side.get()) sidebarEl.classList.add('sidebar-cables-right');
        else sidebarEl.classList.remove('sidebar-cables-right');
};


function onDefaultMinimizedPortChanged() {
    if(!openCloseBtn) { return; }
    if(defaultMinimizedPort.get()) {
        sidebarEl.classList.add('sidebar--closed');
        // openCloseBtn.textContent = BTN_TEXT_CLOSED;
    } else {
        sidebarEl.classList.remove('sidebar--closed');
        // openCloseBtn.textContent = BTN_TEXT_OPEN;
    }
}

function onOpacityPortChange()
{
    var opacity = opacityPort.get();
    sidebarEl.style.opacity = opacity;
}

function onVisiblePortChange() {
    if(visiblePort.get()) {
        sidebarEl.style.display = 'block';
    } else {
        sidebarEl.style.display = 'none';
    }
}

side.onChanged=function()
{

};

/**
 * Some styles cannot be set directly inline, so a dynamic stylesheet is needed.
 * Here hover states can be set later on e.g.
 */
function updateDynamicStyles() {
    let dynamicStyles = document.querySelectorAll('.' + CSS_ELEMENT_DYNAMIC_CLASS);
    if(dynamicStyles) {
        dynamicStyles.forEach(function(e) {
            e.parentNode.removeChild(e);
        });
    }
    let newDynamicStyle = document.createElement('style');
    newDynamicStyle.classList.add(CSS_ELEMENT_DYNAMIC_CLASS);
    let cssText = '.sidebar--closed .sidebar__close-button { ';
    cssText +=         'opacity: ' + minimizedOpacityPort.get();
    cssText +=     '}';
    let cssTextEl = document.createTextNode(cssText);
    newDynamicStyle.appendChild(cssTextEl);
    document.body.appendChild(newDynamicStyle);
}

function initSidebarElement() {
    var element = document.createElement('div');
    element.classList.add(SIDEBAR_CLASS);
    element.classList.add(SIDEBAR_ID);
    var canvasWrapper = op.patch.cgl.canvas.parentElement; /* maybe this is bad outside cables!? */

    if(!canvasWrapper)
    {
        console.warn("[sidebar] no canvas parentelement found...");
        return;
    }
    canvasWrapper.appendChild(element);
    var items = document.createElement('div');
    items.classList.add(SIDEBAR_ITEMS_CLASS);
    element.appendChild(items);
    openCloseBtn = document.createElement('div');
    openCloseBtn.classList.add(SIDEBAR_OPEN_CLOSE_BTN_CLASS);
    openCloseBtn.addEventListener('click', onOpenCloseBtnClick);
    // openCloseBtn.textContent = BTN_TEXT_OPEN;
    element.appendChild(openCloseBtn);
    openCloseBtnIcon = document.createElement('span');
    openCloseBtnIcon.classList.add(SIDEBAR_OPEN_CLOSE_BTN_ICON_CLASS);
    openCloseBtn.appendChild(openCloseBtnIcon);
    return element;
}

function setClosed(b)
{

}

function onOpenCloseBtnClick(ev) {
  ev.stopPropagation();
//   const sidebarEl = ev.target.closest('.' + SIDEBAR_CLASS);
  if(!sidebarEl) { console.error('Sidebar could not be closed...'); return; }
  sidebarEl.classList.toggle('sidebar--closed');
  const btn = ev.target;
  let btnText = BTN_TEXT_OPEN;
  if(sidebarEl.classList.contains('sidebar--closed')) {
    btnText = BTN_TEXT_CLOSED;
   }
   // btn.textContent = btnText
}

function initSidebarCss() {
    //var cssEl = document.getElementById(CSS_ELEMENT_ID);
    var cssElements = document.querySelectorAll('.' + CSS_ELEMENT_CLASS);
    // remove old script tag
    if(cssElements) {
        cssElements.forEach(function(e) {
            e.parentNode.removeChild(e);
        });
    }
    var newStyle = document.createElement('style');
    newStyle.innerHTML = cssFileContent;
    newStyle.classList.add(CSS_ELEMENT_CLASS);
    document.body.appendChild(newStyle);
}

function onDelete() {
    removeElementFromDOM(sidebarEl);
}

function removeElementFromDOM(el) {
    if(el && el.parentNode && el.parentNode.removeChild) {
        el.parentNode.removeChild(el);
    }
}



};

Ops.Sidebar.Sidebar.prototype = new CABLES.Op();
CABLES.OPS["5a681c35-78ce-4cb3-9858-bc79c34c6819"]={f:Ops.Sidebar.Sidebar,objName:"Ops.Sidebar.Sidebar"};




// **************************************************************
// 
// Ops.Sidebar.Button
// 
// **************************************************************

Ops.Sidebar.Button = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// inputs
var parentPort = op.inObject('link');
var buttonTextPort = op.inValueString('Text', 'Button');

// outputs
var siblingsPort = op.outObject('childs');
var buttonPressedPort = op.outTrigger('Pressed Trigger');

// vars
var el = document.createElement('div');
el.classList.add('sidebar__item');
el.classList.add('sidebar--button');
var input = document.createElement('div');
input.classList.add('sidebar__button-input');
el.appendChild(input);
input.addEventListener('click', onButtonClick);
var inputText = document.createTextNode(buttonTextPort.get());
input.appendChild(inputText);
op.toWorkNeedsParent('Ops.Sidebar.Sidebar');

// events
parentPort.onChange = onParentChanged;
buttonTextPort.onChange = onButtonTextChanged;
op.onDelete = onDelete;

// functions

function onButtonClick() {
    buttonPressedPort.trigger();
}

function onButtonTextChanged() {
    var buttonText = buttonTextPort.get();
    input.textContent = buttonText;
    if(CABLES.UI) {
        op.setTitle('Button: ' + buttonText);
    }
}

function onParentChanged() {
    var parent = parentPort.get();
    if(parent && parent.parentElement) {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    } else { // detach
        if(el.parentElement) {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el) {
    if(el) {
        el.style.display = 'block';
    }
}

function hideElement(el) {
    if(el) {
        el.style.display = 'none';
    }
}

function onDelete() {
    removeElementFromDOM(el);
}

function removeElementFromDOM(el) {
    if(el && el.parentNode && el.parentNode.removeChild) {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.Button.prototype = new CABLES.Op();
CABLES.OPS["118df748-16d1-46f4-b8fc-38d7cc5a0aab"]={f:Ops.Sidebar.Button,objName:"Ops.Sidebar.Button"};




// **************************************************************
// 
// Ops.Sidebar.Slider
// 
// **************************************************************

Ops.Sidebar.Slider = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
// constants
const STEP_DEFAULT = 0.00001;

// inputs
const parentPort = op.inObject('link');
const labelPort = op.inValueString('Text', 'Slider');
const inputValuePort = op.inValue('Input', 0.5);
const minPort = op.inValue("Min", 0);
const maxPort = op.inValue("Max", 1);
const stepPort = op.inValue("Step", STEP_DEFAULT);
const setDefaultValueButtonPort = op.inTriggerButton('Set Default');

const reset = op.inTriggerButton('Reset');

const defaultValuePort = op.inValue('Default', 0.5);
defaultValuePort.setUiAttribs({ hidePort: true, greyout: true });

// outputs
const siblingsPort = op.outObject('childs');
const valuePort = op.outValue('Result', defaultValuePort.get());

op.toWorkNeedsParent('Ops.Sidebar.Sidebar');

// vars
var el = document.createElement('div');
el.classList.add('sidebar__item');
el.classList.add('sidebar__slider');
var label = document.createElement('div');
label.classList.add('sidebar__item-label');
var labelText = document.createTextNode(labelPort.get());
label.appendChild(labelText);
el.appendChild(label);
var value = document.createElement('input');
value.value = defaultValuePort.get();
value.classList.add('sidebar__text-input-input');
// value.setAttribute('type', 'number'); /* not possible to use '.' instead of ',' as separator on German computer, so not usable... */
value.setAttribute('type', 'text');
// value.setAttribute('lang', 'en-US'); // force '.' as decimal separator
// value.setAttribute('pattern', '[0-9]+([\.][0-9]+)?'); // only allow '.' as separator
// value.setAttribute('step', 'any'); /* we cannot use the slider step, as it restricts valid numbers to be entered */
// value.setAttribute('formnovalidate', '');
value.oninput = onTextInputChanged;
el.appendChild(value);
var inputWrapper = document.createElement('div');
inputWrapper.classList.add('sidebar__slider-input-wrapper');
el.appendChild(inputWrapper);
var activeTrack = document.createElement('div');
activeTrack.classList.add('sidebar__slider-input-active-track');
inputWrapper.appendChild(activeTrack);
var input = document.createElement('input');
input.classList.add('sidebar__slider-input');
input.setAttribute('min', minPort.get());
input.setAttribute('max', maxPort.get());
input.setAttribute('type', 'range');
input.setAttribute('step', stepPort.get());
input.setAttribute('value', defaultValuePort.get());
input.style.display = 'block'; /* needed because offsetWidth returns 0 otherwise */
inputWrapper.appendChild(input);
updateActiveTrack();
input.addEventListener('input', onSliderInput);

// events
parentPort.onChange = onParentChanged;
labelPort.onChange = onLabelTextChanged;
inputValuePort.onChange = onInputValuePortChanged;
defaultValuePort.onChange = onDefaultValueChanged;
setDefaultValueButtonPort.onTriggered = onSetDefaultValueButtonPress;
minPort.onChange = onMinPortChange;
maxPort.onChange = onMaxPortChange;
stepPort.onChange = stepPortChanged;
op.onDelete = onDelete;

op.init=function()
{
    if(op.patch.config.sidebar)
    {
        op.patch.config.sidebar[labelPort.get()];
        valuePort.set(op.patch.config.sidebar[labelPort.get()]);
    }
    else
        valuePort.set(parseFloat(defaultValuePort.get()));
};

reset.onTriggered=function()
{
    var newValue=parseFloat(defaultValuePort.get());
    valuePort.set(newValue);
    input.value = newValue;
    updateActiveTrack();
};

// functions

function onTextInputChanged(ev) {
    let newValue = parseFloat(ev.target.value);
    if(isNaN(newValue)) {
        newValue = 0;
    }
    const min = minPort.get();
    const max = maxPort.get();
    if(newValue < min) { newValue = min; }
    else if(newValue > max) { newValue = max; }
    // input.value = newValue;
    valuePort.set(newValue);
    updateActiveTrack();
    inputValuePort.set(newValue);
    if(CABLES.UI && gui.patch().isCurrentOp(op)){
        gui.patch().showOpParams(op); /* update DOM */
    }
}

function onInputValuePortChanged() {
    let newValue = parseFloat(inputValuePort.get());
    const minValue = minPort.get();
    const maxValue = maxPort.get();
    if(newValue > maxValue) { newValue = maxValue; }
    else if(newValue < minValue) { newValue = minValue; }
    value.value = newValue;
    input.value = newValue;
    valuePort.set(newValue);
    updateActiveTrack();
}

function onSetDefaultValueButtonPress() {
    let newValue = parseFloat(inputValuePort.get());
    const minValue = minPort.get();
    const maxValue = maxPort.get();
    if(newValue > maxValue) { newValue = maxValue; }
    else if(newValue < minValue) { newValue = minValue; }
    value.value = newValue;
    input.value = newValue;
    valuePort.set(newValue);
    defaultValuePort.set(newValue);
    if(CABLES.UI && gui.patch().isCurrentOp(op)){
        gui.patch().showOpParams(op); /* update DOM */
    }
    updateActiveTrack();
}

function onSliderInput(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    value.value = ev.target.value;
    const inputFloat = parseFloat(ev.target.value);
    valuePort.set(inputFloat);
    inputValuePort.set(inputFloat);
    if(CABLES.UI && gui.patch().isCurrentOp(op)){
        gui.patch().showOpParams(op); /* update DOM */
    }
    updateActiveTrack();
    return false;
}

function stepPortChanged() {
    var step = stepPort.get();
    input.setAttribute('step', step);
    updateActiveTrack();
}

function updateActiveTrack(val) {
    let valueToUse = parseFloat(input.value);
    if(typeof val !== 'undefined') {
        valueToUse = val;
    }
    let availableWidth = input.offsetWidth; /* this returns 0 at the beginning... */
    if(availableWidth === 0) { availableWidth = 206; }
    var trackWidth = CABLES.map(
        valueToUse,
        parseFloat(input.min),
        parseFloat(input.max),
        0,
        availableWidth - 16 /* subtract slider thumb width */
    );
    // activeTrack.style.width = 'calc(' + percentage + '%' + ' - 9px)';
    activeTrack.style.width = trackWidth + 'px';
}

function onMinPortChange() {
    var min = minPort.get();
    input.setAttribute('min', min);
    updateActiveTrack();
}

function onMaxPortChange() {
    var max = maxPort.get();
    input.setAttribute('max', max);
    updateActiveTrack();
}

function onDefaultValueChanged() {
    var defaultValue = defaultValuePort.get();
    valuePort.set(parseFloat(defaultValue));
    onMinPortChange();
    onMaxPortChange();
    input.value = defaultValue;
    value.value = defaultValue;
    updateActiveTrack(defaultValue); // needs to be passed as argument, is this async?
}

function onLabelTextChanged() {
    var labelText = labelPort.get();
    label.textContent = labelText;
    if(CABLES.UI) {
        op.setTitle('Slider: ' + labelText);
    }
}

function onParentChanged() {
    var parent = parentPort.get();
    if(parent && parent.parentElement) {
        parent.parentElement.appendChild(el);
        siblingsPort.set(null);
        siblingsPort.set(parent);
    } else { // detach
        if(el.parentElement) {
            el.parentElement.removeChild(el);
        }
    }
}

function showElement(el) {
    if(el) {
        el.style.display = 'block';
    }
}

function hideElement(el) {
    if(el) {
        el.style.display = 'none';
    }
}

function onDelete() {
    removeElementFromDOM(el);
}

function removeElementFromDOM(el) {
    if(el && el.parentNode && el.parentNode.removeChild) {
        el.parentNode.removeChild(el);
    }
}


};

Ops.Sidebar.Slider.prototype = new CABLES.Op();
CABLES.OPS["eb3232e5-e947-4683-a17f-27a72d464b2c"]={f:Ops.Sidebar.Slider,objName:"Ops.Sidebar.Slider"};




// **************************************************************
// 
// Ops.String.String_v2
// 
// **************************************************************

Ops.String.String_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    v=op.inString("value",""),
    result=op.outString("String");

v.onChange=function()
{
    result.set(v.get());
};



};

Ops.String.String_v2.prototype = new CABLES.Op();
CABLES.OPS["d697ff82-74fd-4f31-8f54-295bc64e713d"]={f:Ops.String.String_v2,objName:"Ops.String.String_v2"};




// **************************************************************
// 
// Ops.Value.SwitchFile
// 
// **************************************************************

Ops.Value.SwitchFile = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
var idx=op.inValueInt("Index");
var valuePorts=[];
var result=op.outValue("Result");

idx.onChange=update;

for(var i=0;i<10;i++)
{
    var p=op.inFile("File "+i);
    valuePorts.push( p );
    p.onChange=update;
}

function update()
{
    if(idx.get()>=0 && valuePorts[idx.get()])
    {
        result.set( valuePorts[idx.get()].get() );
    }
}

};

Ops.Value.SwitchFile.prototype = new CABLES.Op();
CABLES.OPS["ce6e3213-1ce0-4c90-a7d5-e5dc1c23fa63"]={f:Ops.Value.SwitchFile,objName:"Ops.Value.SwitchFile"};




// **************************************************************
// 
// Ops.Math.Floor
// 
// **************************************************************

Ops.Math.Floor = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const number1=op.inValue("Number");
const result=op.outValue("Result");
number1.onChange=exec;

function exec()
{
    result.set(Math.floor(number1.get()));
}



};

Ops.Math.Floor.prototype = new CABLES.Op();
CABLES.OPS["0c77617c-b688-4b55-addf-2cbcaabf98af"]={f:Ops.Math.Floor,objName:"Ops.Math.Floor"};




// **************************************************************
// 
// Ops.Math.Round
// 
// **************************************************************

Ops.Math.Round = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
const
    result=op.outValue("result"),
    number1=op.inValueFloat("number"),
    decPlaces=op.inValueFloat("Decimal Places",0);

number1.onChange=decPlaces.onChange=exec;

function exec()
{
    var decm=Math.pow(10,decPlaces.get());
    result.set(Math.round(number1.get()*decm)/decm);
}



};

Ops.Math.Round.prototype = new CABLES.Op();
CABLES.OPS["1a1ef636-6d02-42ba-ae1e-627b917d0d2b"]={f:Ops.Math.Round,objName:"Ops.Math.Round"};




// **************************************************************
// 
// Ops.WebAudio.BiquadFilter
// 
// **************************************************************

Ops.WebAudio.BiquadFilter = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments={};
this.name="BiquadFilter";

var audioContext = CABLES.WEBAUDIO.createAudioContext(op);

// default values + min and max
var Q_MIN = 0.0001;
var Q_MAX = 1000;
var Q_DEF = 1;
var Q_RESTRICT = true;
var DETUNE_MIN = -3600;
var DETUNE_MAX = 3600;
var DETUNE_DEF = 0;
var DETUNE_RESTRICT = false;
var FREQUENCY_MIN = 10;
var FREQUENCY_MAX = audioContext.sampleRate / 2; // Nyquist frequency.
var FREQUENCY_DEF = 350;
var GAIN_MIN = -40;
var GAIN_MAX = 40;
var GAIN_DEF = 0;
var TYPE_DEF = "allpass";

var biquadFilter = audioContext.createBiquadFilter();

var audioInPort = CABLES.WEBAUDIO.createAudioInPort(op, "Audio In", biquadFilter);
var audioOutPort = CABLES.WEBAUDIO.createAudioOutPort(op, "Audio Out", biquadFilter);

var type = this.addInPort(new CABLES.Port(this,"type",CABLES.OP_PORT_TYPE_VALUE,{display:'dropdown',values:['allpass','lowpass','highpass','bandpass','lowshelf','highshelf','peaking','notch']}));
var frequency = this.addInPort(new CABLES.Port(this, "frequency", CABLES.OP_PORT_TYPE_VALUE, {"display": "range", "min": FREQUENCY_MIN, "max": FREQUENCY_MAX}));
var detune = this.addInPort(new CABLES.Port(this, "detune", CABLES.OP_PORT_TYPE_VALUE, {"display": "range", "min": DETUNE_MIN, "max": DETUNE_MAX}));
var q = this.addInPort(new CABLES.Port(this, "q", CABLES.OP_PORT_TYPE_VALUE, {"display": "range", "min": Q_MIN, "max": Q_MAX}));
var gain = this.addInPort(new CABLES.Port(this, "gain", CABLES.OP_PORT_TYPE_VALUE, {"display": "range", "min": GAIN_MIN, "max": GAIN_MAX}));

var updateType = function(){
    biquadFilter.type = type.get();
};

var updateFrequency = function(){
    var freq = frequency.get();
    if(freq && freq >= FREQUENCY_MIN && freq <= FREQUENCY_MAX) {
        // biquadFilter.frequency.value = frequency.get();
        biquadFilter.frequency.setValueAtTime(frequency.get(), window.audioContext.currentTime);
    }
};

var updateDetune = function(){
    // biquadFilter.detune.value = detune.get();
    biquadFilter.detune.setValueAtTime(detune.get(), window.audioContext.currentTime);
};

var updateQ = function(){
    // biquadFilter.Q.value = q.get();
    biquadFilter.Q.setValueAtTime(q.get(), window.audioContext.currentTime);
};

var updateGain = function(){
    // biquadFilter.gain.value = gain.get();
    biquadFilter.gain.setValueAtTime(gain.get(), window.audioContext.currentTime);
};

type.onChange=updateType;
frequency.onChange=updateFrequency;
detune.onChange=updateDetune;
q.onChange=updateQ;
gain.onChange=updateGain;


type.set(TYPE_DEF);
frequency.set( FREQUENCY_DEF );
detune.set( DETUNE_DEF );
q.set( Q_DEF );
gain.set( GAIN_DEF );


};

Ops.WebAudio.BiquadFilter.prototype = new CABLES.Op();
CABLES.OPS["3e28f86a-4f74-49a2-a1a6-f8943c00352d"]={f:Ops.WebAudio.BiquadFilter,objName:"Ops.WebAudio.BiquadFilter"};


