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

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <HeroSection vertical={vertical} />
        <KPICards kpiDefs={vertical.kpis} kpis={kpis} onUpdate={updateKpi} />
        <ModuleSelector
          modules={vertical.modules}
          selected={selectedModules}
          onToggle={toggleModule}
        />
        <SensorSelector
          sensors={vertical.sensors}
          selected={selectedSensors}
          onToggle={toggleSensor}
          sensorMode={sensorMode}
          onModeChange={setSensorMode}
          sensorQuantities={sensorQuantities}
          onQtyChange={updateSensorQty}
          effectiveSensorQty={effectiveSensorQty}
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
