"use client"

import React from "react"
import L from "leaflet"
/**
 * https://react-leaflet.js.org/
 * 国外服务器，需要VPN：https://tile.openstreetmap.org/{z}/{x}/{y}.png
 */
import { MapContainer, Marker, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src
})

interface MapProps {
	center?: number[]
}

export default function Map({ center }: MapProps) {
	return (
		<MapContainer
			className="h-[35vh] rounded-lg"
			center={(center as L.LatLngExpression) || [51.505, -0.09]}
			zoom={center ? 4 : 2}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{center && <Marker position={center as L.LatLngExpression} />}
		</MapContainer>
	)
}
