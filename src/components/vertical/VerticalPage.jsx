import HeroSection from './HeroSection'
import KPICards from './KPICards'
import ModuleSelector from './ModuleSelector'
import SensorSelector from './SensorSelector'
import CustomerForm from '../form/CustomerForm'
import LiveSidebar from '../summary/LiveSidebar'
import styles from './VerticalPage.module.css'

export default function VerticalPage({ vertical, state, onNavigateFinal }) {
  const {
    kpis, selectedModules, selectedSensors, formData,
    toggleModule, toggleSensor, updateKpi, updateForm,
    systemSize, cameraCount, moduleCount, sensorCount,
    sensorMode, setSensorMode, sensorQuantities, updateSensorQty, effectiveSensorQty,
  } = state

  // Convert Set + effectiveSensorQty to array of {name, qty} for SensorSelector
  const sensorSelection = Array.from(selectedSensors).map(name => ({
    name,
    qty: effectiveSensorQty[name] || 0,
  }))

  // Sync SensorSelector's array-based changes back to Set-based state
  function handleSensorsChange(newSensors) {
    const newNames = new Set(newSensors.map(s => s.name))
    // Remove deselected sensors
    for (const name of Array.from(selectedSensors)) {
      if (!newNames.has(name)) toggleSensor(name)
    }
    // Add newly selected sensors and update quantities
    for (const { name, qty } of newSensors) {
      if (!selectedSensors.has(name)) toggleSensor(name)
      if (qty !== undefined) updateSensorQty(name, qty)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <HeroSection vertical={vertical} includedModules={Array.from(selectedModules)} />
        <KPICards vertical={vertical} values={kpis} onChange={updateKpi} />
        <ModuleSelector
          vertical={vertical}
          selected={Array.from(selectedModules)}
          onToggle={toggleModule}
        />
        <SensorSelector
          vertical={vertical}
          sensors={sensorSelection}
          onChange={handleSensorsChange}
          rooms={Number(formData.anzahlRaeume) || 1}
        />
        <CustomerForm formData={formData} onUpdate={updateForm} vertical={vertical} />
      </div>

      <aside className={styles.sidebar}>
        <LiveSidebar
          selectedModules={selectedModules}
          selectedSensors={selectedSensors}
          effectiveSensorQty={effectiveSensorQty}
          systemSize={systemSize}
          cameraCount={cameraCount}
          moduleCount={moduleCount}
          sensorCount={sensorCount}
          formData={formData}
          vertical={vertical}
          onNavigateFinal={onNavigateFinal}
        />
      </aside>
    </div>
  )
}
