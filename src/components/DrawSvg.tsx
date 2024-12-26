import React from 'react';
import { Children, JSX, ReactElement, useLayoutEffect,useRef,useState, } from "react"

type fill = "none" | "forwards" | "backwards" | "both" | "initial" | "inherit" | "unset"

interface DrawStyle{
    stroke:string,
    strokeWidth:string,
    delay:string,
    duration:string,
    fillMode?: fill,
    timingFunction?:string
}

interface FillStyle{
    fill:string,
    delay:string,
    duration:string,
    fillMode?:fill,
    timingFunction?:string
}

function DrawSvg({children,drawStyle,fillStyle}:{drawStyle:DrawStyle,fillStyle:FillStyle,children:JSX.Element[] | JSX.Element}):JSX.Element{
    
    const pathRef=useRef<(SVGPathElement)[]>([])
    const [pathsLength,setPathsLength]=useState<string[]>([])
    useLayoutEffect(()=>{
        const totalLength:string[]=[]
        pathRef.current.map(path=>{
            const length:string=path.getTotalLength()+"px"
            totalLength.push(length)
        })
        setPathsLength([...totalLength])
    },[])

    function getAllPaths(element:JSX.Element,pathsArr:ReactElement[]=[]){
        if(element.type==="path"){
            pathsArr.push(element)
            return pathsArr
        }  
        const childElements=element.props.children
        Children.forEach(childElements,child=>{
            if(child.type==="path"){
                pathsArr.push(child)
            }
            else{
                getAllPaths(child,pathsArr)
            }
        })

        return pathsArr
    }

    const paths:ReactElement[]=[]

    Children.forEach(children,child=>{
        const childPaths:ReactElement[]=getAllPaths(child)
        paths.push(...childPaths)
    })
    
    const drawStyleProps={stroke:drawStyle.stroke,strokeWidth:drawStyle.strokeWidth}

    const fillStyleProps={fill:"transparent"}  
    
    const animation=`draw-path ${drawStyle.duration} ${drawStyle.timingFunction || "ease"} ${drawStyle.delay} ${drawStyle.fillMode || "forwards"},fill-path ${fillStyle.duration} ${fillStyle.timingFunction || "ease"} ${fillStyle.delay} ${fillStyle.fillMode || "forwards"}`    
    
    const pathProps:object[]=paths.map(path=>path.props as object)
    
    const refFn=(element:SVGPathElement)=>{
        if(pathRef.current.includes(element) || element===null)return
        pathRef.current.push(element)
    }
    
    if(paths.length==0)return  (<text fill="black" x="500" y="40" fontSize="32" textAnchor="middle" dominantBaseline="middle">At least one path element is required for DrawSvg to function correctly.</text>)

    return(
        <>
            <style>
            {`
          @keyframes draw-path{
            to{
                stroke-dashoffset: 0px;
            }
            }
            @keyframes fill-path{
            to{
                fill:${fillStyle.fill}
            }
            }
        `}
            </style>
            {pathProps.map((pathProp,index)=><path key={index} {...pathProp} style={{strokeDasharray:pathsLength[index] || "",strokeDashoffset:pathsLength[index] || "",animation,...drawStyleProps,...fillStyleProps}} ref={refFn}/>)}
        </>
    )
}

export default DrawSvg